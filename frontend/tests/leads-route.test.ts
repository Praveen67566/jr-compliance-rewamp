import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { POST } from "@/app/api/leads/route";
import { resetLeadRateLimit } from "@/lib/lead-rate-limit";

const siteOrigin = "https://www.jr.test";

const validBody = {
  name: "Priya Sharma",
  email: "priya@example.com",
  phone: "+919876543210",
  message: "I need help with company registration.",
  consent: true,
  website: "",
  pageTitle: "Company Registration",
  pathname:
    "/corporate/company-registration/private-limited-company-registration-consultant",
};

function leadRequest(
  body: Record<string, unknown> = validBody,
  options: {
    ip?: string;
    origin?: string | null;
    pathname?: string;
    requestOrigin?: string;
  } = {},
) {
  const pathname = options.pathname ?? String(body.pathname ?? "/contact-us");
  const requestOrigin = options.requestOrigin ?? siteOrigin;
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-Real-IP": options.ip ?? "203.0.113.10",
    Referer: `${requestOrigin}${pathname}`,
  });
  if (options.origin !== null) {
    headers.set("Origin", options.origin ?? requestOrigin);
  }

  return new Request(`${requestOrigin}/api/leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  resetLeadRateLimit();
  process.env.SITE_URL = siteOrigin;
  process.env.LEAD_WEBHOOK_BASE_URL = "https://webhook.jrcompliance.com";
});

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

type FetchCall = [RequestInfo | URL, RequestInit | undefined];

function stubFetch(
  implementation: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
) {
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push([input, init]);
    return implementation(input, init);
  }) as typeof fetch;
  return calls;
}

describe("POST /api/leads", () => {
  it("forwards one exact corporate payload and accepts an empty 204 response", async () => {
    const fetchCalls = stubFetch(async () => new Response(null, { status: 204 }));

    const response = await POST(
      leadRequest({
        ...validBody,
        phone: "98765-43210",
        pageParameters: { utm_source: "google", ignored: "never-forward" },
        responsible: "not-forwarded",
        stage: "not-forwarded",
      }),
    );

    assert.equal(response.status, 200);
    assert.equal(fetchCalls.length, 1);
    const [url, init] = fetchCalls[0];
    assert.equal(String(url), "https://webhook.jrcompliance.com/corporate");
    assert.deepEqual(JSON.parse(String(init?.body)), {
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+919876543210",
      message: "I need help with company registration.",
      page_name:
        "Company Registration - /corporate/company-registration/private-limited-company-registration-consultant",
      page_parameters: { utm_source: "google" },
    });
  });

  it("forwards a canonical international phone without adding country fields", async () => {
    const fetchCalls = stubFetch(async () => new Response(null, { status: 204 }));

    const response = await POST(
      leadRequest({
        ...validBody,
        phone: "+1 213 373 4253",
        country: "United States",
        countryCode: "US",
        dialCode: "+1",
        formattedPhone: "+1 (213) 373-4253",
      }),
    );

    assert.equal(response.status, 200);
    assert.equal(fetchCalls.length, 1);
    assert.deepEqual(JSON.parse(String(fetchCalls[0][1]?.body)), {
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+12133734253",
      message: "I need help with company registration.",
      page_name:
        "Company Registration - /corporate/company-registration/private-limited-company-registration-consultant",
    });
  });

  it("rejects a malformed international phone without calling downstream", async () => {
    const fetchCalls = stubFetch(async () => new Response(null, { status: 204 }));

    const response = await POST(
      leadRequest({ ...validBody, phone: "+1 213 373 4253 x9" }),
    );

    assert.equal(response.status, 422);
    assert.equal(fetchCalls.length, 0);
    const body = (await response.json()) as { errors?: { phone?: string } };
    assert.ok(body.errors?.phone);
  });

  it("forwards an empty optional message", async () => {
    const fetchCalls = stubFetch(async () => new Response(null, { status: 204 }));

    const response = await POST(leadRequest({ ...validBody, message: "" }));

    assert.equal(response.status, 200);
    assert.equal(fetchCalls.length, 1);
    assert.equal(JSON.parse(String(fetchCalls[0][1]?.body)).message, "");
  });

  it("still rejects missing consent without calling downstream", async () => {
    const fetchCalls = stubFetch(async () => new Response(null, { status: 204 }));

    const response = await POST(leadRequest({ ...validBody, message: "", consent: false }));

    assert.equal(response.status, 422);
    assert.equal(fetchCalls.length, 0);
  });

  it("rejects a filled honeypot and a cross-origin request", async () => {
    const fetchCalls = stubFetch(async () => new Response(null, { status: 204 }));

    const honeypotResponse = await POST(
      leadRequest({ ...validBody, website: "https://bot.example" }, { ip: "203.0.113.11" }),
    );
    const originResponse = await POST(
      leadRequest(validBody, { ip: "203.0.113.12", origin: "https://attacker.example" }),
    );

    assert.equal(honeypotResponse.status, 422);
    assert.equal(originResponse.status, 403);
    assert.equal(fetchCalls.length, 0);
  });

  it("does not trust an alternate request host when SITE_URL is configured", async () => {
    const fetchCalls = stubFetch(async () => new Response(null, { status: 204 }));

    const response = await POST(
      leadRequest(validBody, {
        ip: "203.0.113.15",
        requestOrigin: "https://alternate.test",
      }),
    );

    assert.equal(response.status, 403);
    assert.equal(fetchCalls.length, 0);
  });

  it("rejects a non-bare Origin value", async () => {
    const fetchCalls = stubFetch(async () => new Response(null, { status: 204 }));

    const response = await POST(
      leadRequest(validBody, {
        ip: "203.0.113.16",
        origin: `${siteOrigin}/unexpected-path`,
      }),
    );

    assert.equal(response.status, 403);
    assert.equal(fetchCalls.length, 0);
  });

  it("reports downstream failure as an error and does not retry", async () => {
    const fetchCalls = stubFetch(async () => new Response("failure", { status: 500 }));

    const response = await POST(leadRequest(validBody, { ip: "203.0.113.13" }));

    assert.equal(response.status, 502);
    assert.equal(fetchCalls.length, 1);
    assert.deepEqual(await response.json(), {
      success: false,
      message: "We could not send your request. Please try again.",
    });
  });

  it("maps a downstream abort to an unconfirmed timeout without retrying", async () => {
    const fetchCalls = stubFetch(async () => {
      throw new DOMException("The operation was aborted.", "AbortError");
    });

    const response = await POST(leadRequest(validBody, { ip: "203.0.113.17" }));
    const body = (await response.json()) as { success: boolean; message: string };

    assert.equal(response.status, 504);
    assert.equal(fetchCalls.length, 1);
    assert.equal(body.success, false);
    assert.match(body.message, /could not be confirmed/i);
  });

  it("limits the sixth request from the same address", async () => {
    const fetchCalls = stubFetch(async () => new Response(null, { status: 204 }));

    const responses = [];
    for (let index = 0; index < 6; index += 1) {
      responses.push(await POST(leadRequest(validBody, { ip: "203.0.113.14" })));
    }

    assert.deepEqual(
      responses.map((response) => response.status),
      [200, 200, 200, 200, 200, 429],
    );
    assert.ok(responses[5].headers.get("retry-after"));
    assert.equal(fetchCalls.length, 5);
  });
});
