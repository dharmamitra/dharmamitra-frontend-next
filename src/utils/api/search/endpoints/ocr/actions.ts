// 413 errors fail silently see: https://github.com/vercel/next.js/discussions/77368
// input file size validation must be done by client beforehand in alignment
// with the bodySizeLimit config value.

"use server"

import { z } from "zod"

import apiClients from "@/utils/api/client"

const schema = z.object({
  extracted_text: z.string(),
  pages: z.number(),
  processing_time_seconds: z.number(),
})

// Define the possible return types
export type ParsedOCRJson = {
  type: "json"
  extractedText: string
  pages: number
}

export type ParsedOCRText = {
  type: "text"
  content: string
}

export type ParsedOCRResponse = ParsedOCRJson | ParsedOCRText

const parseAPIResponse = (responseData: unknown): ParsedOCRResponse => {
  const parseResult = schema.safeParse(responseData)

  if (parseResult.success) {
    return {
      type: "json",
      extractedText: parseResult.data.extracted_text,
      pages: parseResult.data.pages,
    }
  } else {
    if (typeof responseData === "string") {
      return {
        type: "text",
        content: responseData,
      }
    } else {
      throw new Error("Unexpected API response format received.")
    }
  }
}

export const getOCR = async ({
  file,
  transliterateDevanagariToIAST,
  transliterateTibetanToWylie,
}: {
  file: File
  transliterateDevanagariToIAST: boolean
  transliterateTibetanToWylie: boolean
}) => {
  try {
    const body = new FormData()
    body.append("file", file, file.name)

    const { data, error } = await apiClients.Search.POST("/ocr/", {
      headers: {
        "X-Key": process.env.DM_API_KEY ?? "",
      },
      params: {
        query: {
          transliterate_devanagari_to_iast: transliterateDevanagariToIAST,
          transliterate_tibetan_to_wylie: transliterateTibetanToWylie,
        },
      },
      // Re-add ts-expect-error as the API client type seems incorrect for FormData
      // @ts-expect-error FormData is the correct type for file uploads.
      body,
    })

    if (error) {
      let errorMessage = "Failed to process OCR request"
      if (typeof error === "string") {
        errorMessage = error
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = String(error.message)
      } else {
        try {
          errorMessage = JSON.stringify(error)
        } catch {
          errorMessage = "Unknown error occurred during OCR request."
        }
      }
      throw new Error(errorMessage)
    }

    return parseAPIResponse(data)
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error(String(error) || "An unknown error occurred in getOCR")
    }
  }
}
