export function extractSSEContent(eventMessage: string): string {
  const regex = /data: '(.+)'\n\n/
  const match = eventMessage.match(regex)
  return match && match[1] ? match[1] : ""
}
