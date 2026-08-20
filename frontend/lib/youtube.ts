const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com"]);
const YOUTUBE_NOCOOKIE_HOSTS = new Set([
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

function videoIdFromPath(pathname: string, prefix: string): string | null {
  const leadingPath = prefix ? `/${prefix}/` : "/";
  if (!pathname.startsWith(leadingPath)) {
    return null;
  }

  const candidate = pathname.slice(leadingPath.length).replace(/\/$/, "");
  return VIDEO_ID_PATTERN.test(candidate) ? candidate : null;
}

/** Convert a supported single-video YouTube URL into a privacy-enhanced embed URL. */
export function youtubeEmbedUrl(value: string): string | null {
  let url: URL;

  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }

  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port
  ) {
    return null;
  }

  let videoId: string | null = null;

  if (url.hostname === "youtu.be") {
    videoId = videoIdFromPath(url.pathname, "");
  } else if (YOUTUBE_HOSTS.has(url.hostname)) {
    if (url.pathname === "/watch") {
      const candidate = url.searchParams.get("v");
      videoId = candidate && VIDEO_ID_PATTERN.test(candidate) ? candidate : null;
    } else {
      videoId =
        videoIdFromPath(url.pathname, "shorts") ??
        videoIdFromPath(url.pathname, "embed") ??
        videoIdFromPath(url.pathname, "live");
    }
  } else if (YOUTUBE_NOCOOKIE_HOSTS.has(url.hostname)) {
    videoId = videoIdFromPath(url.pathname, "embed");
  }

  return videoId && VIDEO_ID_PATTERN.test(videoId)
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : null;
}
