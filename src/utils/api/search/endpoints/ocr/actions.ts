// 413 errors fail silently see: https://github.com/vercel/next.js/discussions/77368
// input file size validation must be done by client beforehand in alignment
// with the bodySizeLimit config value.

"use server"

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

  throw new Error("Unexpected API response format received.")
}

export const getOCR = async ({
  file,
  transliterateDevanagariToIAST = false,
  transliterateTibetanToWylie = false,
}: {
  file: File
  transliterateDevanagariToIAST?: boolean
  transliterateTibetanToWylie?: boolean
}) => {
  try {
    const query = new URLSearchParams()
    query.set(
      "transliterate_devanagari_to_iast",
      String(transliterateDevanagariToIAST),
    )
    query.set(
      "transliterate_tibetan_to_wylie",
      String(transliterateTibetanToWylie),
    )

    const url = `${searchBaseUrl}/ocr/?${query}`

    const body = new FormData()
    body.append("file", file, file.name)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Key": process.env.DM_API_KEY ?? "",
      },
      body,
    })

    if (!response.ok) {
      throw new Error(`Failed to process OCR request: ${response.statusText}`)
    }

    const contentDisposition = response.headers.get("content-disposition")

    if (contentDisposition) {
      const [filenameMatch] =
        contentDisposition.match(/filename=(.*?)(\s|\r|\n)?$/) ?? []

      if (filenameMatch) {
        return {
          type: "file" as const,
          filename: filenameMatch.replace("filename=", "mitra-ocr-"),
          file: await response.blob(),
        }
      }

      throw new Error(
        "Failed to extract filename from content-disposition header",
      )
    }

    const data = await response.json()
    return parseJSONResponse(data)
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error(String(error) || "An unknown error occurred in getOCR")
    }
  }
}
