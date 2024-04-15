export function extractSSEContent(eventMessage: string): string {
  const regex = /data: '(.+)'\n\n/
  const match = eventMessage.match(regex)
  return match && match[1] ? match[1] : ""
}

export function cleanSSEData(eventData: string) {
  return eventData
    .replace(/(^'|'$)/g, "")
    .replace(/\\"/g, '"')
    .replace(/#/g, "<br />")
}

export const makeCleanRoute = (route: string[]) => {
  return route
    .filter(Boolean)
    .join("/")
    .replace(/\/{2,}/g, "/")
    .replace(/\/$/, "")
}
