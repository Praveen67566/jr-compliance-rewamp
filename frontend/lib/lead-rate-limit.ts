const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAX_BUCKETS = 5000;

type Bucket = {
  attempts: number;
  resetsAt: number;
};

const buckets = new Map<string, Bucket>();

export type LeadRateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterSeconds: number };

function removeExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetsAt <= now) {
      buckets.delete(key);
    }
  }
}

function keepMapBounded(now: number) {
  if (buckets.size < MAX_BUCKETS) {
    return;
  }

  removeExpiredBuckets(now);
  while (buckets.size >= MAX_BUCKETS) {
    const oldestKey = buckets.keys().next().value as string | undefined;
    if (!oldestKey) {
      break;
    }
    buckets.delete(oldestKey);
  }
}

export function takeLeadRateLimit(key: string, now = Date.now()): LeadRateLimitResult {
  const current = buckets.get(key);
  if (!current || current.resetsAt <= now) {
    keepMapBounded(now);
    buckets.set(key, { attempts: 1, resetsAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (current.attempts >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetsAt - now) / 1000)),
    };
  }

  current.attempts += 1;
  return { allowed: true, remaining: MAX_ATTEMPTS - current.attempts };
}

/** Test isolation only; production code never needs to reset the limiter. */
export function resetLeadRateLimit() {
  buckets.clear();
}
