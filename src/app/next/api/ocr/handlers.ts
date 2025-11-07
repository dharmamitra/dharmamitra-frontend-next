import { NextResponse } from "next/server"
import {
  Agent,
  fetch as undiciFetch,
  FormData as UndiciFormData,
  Response as UndiciResponse,
} from "undici"

import { searchBaseUrl } from "@/utils/api/client"

import { createForwardedHeaders } from "../utils"

/**
 * Returns `null` if response param is not a file
 */
export async function handleFileResponse(response: UndiciResponse) {
  const contentDisposition = response.headers.get("content-disposition")
  if (!contentDisposition) return null

  const contentType = response.headers.get("content-type") || "application/octet-stream"
  const arrayBuffer = await response.arrayBuffer()

  return new NextResponse(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
      "X-Accel-Buffering": "no",
    },
  })
}

export async function handleJsonResponse(response: UndiciResponse) {
  const responseData = await response.json()
  return NextResponse.json(responseData, {
    headers: {
      "X-Accel-Buffering": "no",
    },
  })
}

export async function fetchOCRData({
  headers,
  body,
  query,
}: {
  headers: Headers
  body: UndiciFormData
  query: URLSearchParams
}) {
  const longAgent = new Agent({
    // disable timeouts to prevent long-running requests from being aborted
    headersTimeout: 0,
    bodyTimeout: 0,
  })

  const url = `${searchBaseUrl}/ocr/?${query}`

  const result = await undiciFetch(url, {
    method: "POST",
    headers: {
      "X-Key": process.env.DM_API_KEY ?? "",
      ...createForwardedHeaders(headers),
    },
    body,
    // Non-standard option recognized by Node's fetch (Undici)
    dispatcher: longAgent,
  })

  return result
}
