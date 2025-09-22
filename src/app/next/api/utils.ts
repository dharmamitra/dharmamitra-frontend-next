// Curated pass-through of client-related headers (exclude sensitive headers like cookies/authorization)
export const streamHeaderMap: Record<string, string> = {
  "x-forwarded-for": "X-Forwarded-For",
  forwarded: "Forwarded",
  "x-real-ip": "X-Real-IP",
  "cf-connecting-ip": "CF-Connecting-IP",
  "true-client-ip": "True-Client-IP",
  "fly-client-ip": "Fly-Client-IP",
  "user-agent": "User-Agent",
  "accept-language": "Accept-Language",
  "x-request-id": "X-Request-Id",
}

export const createStreamHeaders = (headers: Headers) => {
  const outgoingHeaders: Record<string, string> = {}
  for (const [inName, outName] of Object.entries(streamHeaderMap)) {
    const value = headers.get(inName)
    if (value) outgoingHeaders[outName] = value
  }
  return outgoingHeaders
}
