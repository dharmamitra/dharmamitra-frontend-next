import React from "react"
import { SSE, SSEvent } from "sse.js"

import { SearchApiTypes, streamUtils } from "@/api"
import appConfig from "@/config"
import { parseStream } from "@/utils/api/stream"
import { cleanSSEData } from "@/utils/transformers"

export type SummaryStreamProps = {
  isExpanded: boolean
  request: SearchApiTypes.RequestBody<"/summary/">
}

export default function useSearchPrimaryExplanationStream({
  isExpanded,
  request,
}: SummaryStreamProps) {
  const [stream, setSummaryStream] = React.useState<string | undefined>("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<
    { errorCode: 400 | 500 | 504; message: string; data?: SSEvent } | undefined
  >(undefined)
  const [eventSource, setEventSource] = React.useState<SSE | null>(null)
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null)

  const startStream = React.useCallback(() => {
    if (eventSource) {
      eventSource.close()
    }

    setSummaryStream("")
    setIsLoading(true)
    setError(undefined)

    let responseReceived = false

    timeoutIdRef.current = setTimeout(() => {
      if (!responseReceived) {
        setIsLoading(false)
        setError({ errorCode: 504, message: "timeout" })
        eventSource?.close()
      }
    }, 15000)

    const newEventSource = new SSE(
      appConfig.basePath + streamUtils.paths["search-summary"],
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        payload: JSON.stringify(request),
      },
    )

    newEventSource.addEventListener("message", (event: MessageEvent) => {
      responseReceived = true
      setIsLoading(false)
      setSummaryStream((prev) => prev + cleanSSEData(event.data))
    })

    newEventSource.addEventListener(
      "readystatechange",
      (event: EventSource) => {
        if (event.readyState >= 2) {
          setIsLoading(false)
        }
      },
    )

    newEventSource.onerror = (err) => {
      responseReceived = true
      clearTimeout(timeoutIdRef.current!)
      setIsLoading(false)
      setError((prev) =>
        prev
          ? { ...prev, data: err }
          : { errorCode: 500, message: "unknown", data: err },
      )
    }

    newEventSource.stream()
    setEventSource(newEventSource)

    return () => {
      clearTimeout(timeoutIdRef.current!)
    }
  }, [request, eventSource])

  const stopStream = React.useCallback(() => {
    if (eventSource) {
      eventSource.close()
      setEventSource(null)
      setIsLoading(false)
    }
  }, [eventSource])

  const hasTriggered = React.useRef(false)

  React.useEffect(() => {
    if (!isExpanded || hasTriggered.current) return

    hasTriggered.current = true
    startStream()

    return () => {
      stopStream()
    }
  }, [startStream, stopStream, isExpanded, hasTriggered])

  return { ...parseStream(stream), isLoading, error }
}
