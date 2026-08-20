import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { youtubeEmbedUrl } from "@/lib/youtube";

const videoId = "dQw4w9WgXcQ";
const expectedEmbedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

describe("youtubeEmbedUrl", () => {
  it("normalizes supported single-video YouTube URLs", () => {
    for (const url of [
      `https://youtube.com/watch?v=${videoId}`,
      `https://www.youtube.com/watch?v=${videoId}&list=PL123&t=42`,
      `https://m.youtube.com/watch?v=${videoId}`,
      `https://youtu.be/${videoId}?si=share-token`,
      `https://www.youtube.com/shorts/${videoId}?feature=share`,
      `https://www.youtube.com/embed/${videoId}`,
      `https://www.youtube.com/live/${videoId}?si=share-token`,
      `https://youtube-nocookie.com/embed/${videoId}`,
      `https://www.youtube-nocookie.com/embed/${videoId}`,
    ]) {
      assert.equal(youtubeEmbedUrl(url), expectedEmbedUrl, url);
    }
  });

  it("rejects non-HTTPS, non-YouTube, playlist-only, channel, and malformed URLs", () => {
    for (const url of [
      `http://www.youtube.com/watch?v=${videoId}`,
      `https://youtube.example/watch?v=${videoId}`,
      `https://notyoutube.com/watch?v=${videoId}`,
      `https://www.youtube.com/playlist?list=PL123`,
      "https://www.youtube.com/@jrcompliance",
      "https://www.youtube.com/watch?v=too-short",
      `https://youtu.be/${videoId}/unexpected`,
      `javascript:alert(1)`,
      videoId,
      "not a URL",
      "",
    ]) {
      assert.equal(youtubeEmbedUrl(url), null, url);
    }
  });
});
