import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"
import { SSE, SSEvent } from "sse.js"

import { SearchApiTypes, streamUtils } from "@/api"
import FormatedStream from "@/components/FormatedStream"
import LoadingDots from "@/components/LoadingDots"
import useAppConfig from "@/hooks/useAppConfig"
import { errorPattern, pasrseStreamContent } from "@/utils/api/stream"
import { cleanSSEData } from "@/utils/transformers"

export type SummaryStreamProps = {
  isExpanded: boolean
  request: SearchApiTypes.SummaryRequestBody
}

export default function SummaryStream({
  isExpanded,
  request,
}: SummaryStreamProps) {
  const t = useTranslations("generic")
  const { basePath } = useAppConfig()

  const [summaryStream, setSummaryStream] = React.useState<string | undefined>(
    "",
  )
  const [isLoading, setIsLoading] = React.useState(false)
  const [isStreaming, setIsStreaming] = React.useState(false)
  const [error, setError] = React.useState<
    { errorCode: 400 | 500 | 504; error: string; data?: SSEvent } | undefined
  >(undefined)
  const [eventSource, setEventSource] = React.useState<SSE | null>(null)
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null)

  const stableRequest = React.useMemo(() => request, [request])
  const stableBasePath = React.useMemo(() => basePath, [basePath])

  const startStream = React.useCallback(() => {
    if (eventSource) {
      eventSource.close()
    }

    setSummaryStream("")
    setIsLoading(true)
    setIsStreaming(true)
    setError(undefined)

    let responseReceived = false

    timeoutIdRef.current = setTimeout(() => {
      if (!responseReceived) {
        setIsLoading(false)
        setError({ errorCode: 504, error: "timeout" })
        eventSource?.close()
      }
    }, 15000)

    const newEventSource = new SSE(
      stableBasePath + streamUtils.paths["search-summary"],
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        payload: JSON.stringify(stableRequest),
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
          setIsStreaming(false)
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
          : { errorCode: 500, error: "unknown", data: err },
      )
    }

    newEventSource.stream()
    setEventSource(newEventSource)

    return () => {
      clearTimeout(timeoutIdRef.current!)
    }
  }, [stableBasePath, stableRequest, eventSource])

  const stopStream = React.useCallback(() => {
    if (eventSource) {
      eventSource.close()
      setEventSource(null)
      setIsLoading(false)
      setIsStreaming(false)
    }
  }, [eventSource])

  const isTriggered = React.useRef(true)

  React.useEffect(() => {
    if (isTriggered.current && !isStreaming) {
      startStream()
      isTriggered.current = false
    }

    return () => {
      stopStream()
    }
  }, [startStream, stopStream, isTriggered, isStreaming])

  const { exceptionI18nKey } = pasrseStreamContent(
    summaryStream ?? "",
    errorPattern,
  )

  if (!isExpanded) return null

  if (error) {
    return (
      <Typography
        variant="body2"
        color="error.main"
        borderRadius={1}
        display="inline-block"
        my={1}
      >
        Crumbs! There was an error getting summary.
      </Typography>
    )
  }

  if (exceptionI18nKey) {
    return (
      <Typography
        variant="body2"
        color="error.main"
        py={1}
        px={2}
        border={1}
        borderColor="error.main"
        borderRadius={1}
        display="inline-block"
        my={1}
      >
        {t(`error.${exceptionI18nKey}`)}
      </Typography>
    )
  }

  if (isLoading) return <LoadingDots />

  return (
    <FormatedStream
      componentId="summary"
      stream={summaryStream ?? ""}
      sx={{
        fontFamily: "monospace",
        lineHeight: "1.15",
        color: "text.secondary",
        fontSize: "1.15rem !important",
      }}
    />
  )
}
