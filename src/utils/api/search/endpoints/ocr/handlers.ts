import { z } from "zod"

import { searchBaseUrl } from "@/utils/api/client"

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
  filename: string
  file: Blob
}

export type ParsedOCRResponse = ParsedOCRJson | ParsedOCRFile

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
    type: "unknown" as const,
    parserError: parseResult.error.message,
  }
}

export async function parseOCRResponse(response: Response) {
  const contentDisposition = response.headers.get("content-disposition")

  if (contentDisposition) {
    const [filenameMatch] =
      contentDisposition.match(/filename=(.*?)(\s|\r|\n)?$/) ?? []

    if (!filenameMatch) {
      throw new Error(
        "Failed to extract filename from content-disposition header",
      )
    }

    return {
      type: "file" as const,
      filename: filenameMatch.replace("filename=", "mitra-ocr-"),
      file: await response.blob(),
    }
  }

  const json = await response.json()
  const pasrsedData = parseJSONResponse(json)
  if (pasrsedData.type === "json") {
    return pasrsedData
  }

  throw new Error(
    `Unexpected return from OCR request. Return is not a file, or cannot be parsed. ${pasrsedData.parserError}`,
  )
}

export async function fetchOCRData(body: FormData, query: URLSearchParams) {
  const url = `${searchBaseUrl}/ocr/?${query}`
  return await fetch(url, {
    method: "POST",
    headers: {
      "X-Key": process.env.DM_API_KEY ?? "",
    },
    body,
  })
}
