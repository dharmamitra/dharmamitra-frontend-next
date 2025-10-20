import { z } from "zod"

import { makeOCROutputFileName } from "@/components/features/MitraOCR/utils"

const schema = z.object({
  extracted_text: z.string(),
  pages: z.number(),
  processing_time_seconds: z.number(),
})

export type ParsedOCRJson = {
  type: "json"
  extractedText: string
  pages: number
}

export type ParsedOCRFile = {
  type: "file"
  fileName: string
  file: Blob
}

export type ParsedOCRError = {
  type: "error"
  ok: false
  errorCode: number
  errorText: string
}

export type ParsedOCRResponse = ParsedOCRJson | ParsedOCRFile | ParsedOCRError

const parseJSONResponse = (responseData: unknown) => {
  const parseResult = schema.safeParse(responseData)

  if (parseResult.success) {
    return {
      type: "json" as const,
      extractedText: parseResult.data.extracted_text,
      pages: parseResult.data.pages,
    }
  }

  return {
    type: "error" as const,
    ok: false as const,
    errorCode: 500,
    errorText: `JSON parsing failed: ${parseResult.error.message}`,
  }
}

export async function parseOCRResponse(response: Response, fileName?: string) {
  if (!response.ok) {
    return {
      type: "error" as const,
      ok: false as const,
      errorCode: response.status,
      errorText: response.statusText,
    }
  }

  const contentDisposition = response.headers.get("content-disposition")

  if (contentDisposition) {
    return {
      type: "file" as const,
      fileName: makeOCROutputFileName(fileName),
      file: await response.blob(),
    }
  }

  const json = await response.json()
  const pasrsedData = parseJSONResponse(json)
  if (pasrsedData.type === "json") {
    return pasrsedData
  }

  return {
    type: "error" as const,
    ok: false as const,
    errorCode: response.status,
    errorText: "Unexpected return from OCR request. Return is not a file, or cannot be parsed.",
  }
}
