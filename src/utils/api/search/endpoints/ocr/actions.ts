"use server"

import { z } from "zod"

import { SearchApiTypes } from "@/api"
import apiClients from "@/utils/api/client"

const schema = z.object({
  extracted_text: z.string(),
  pages: z.number(),
  processing_time_seconds: z.number(),
})

const parseAPIResponse = (response: SearchApiTypes.Response<"/ocr/">) => {
  const parsedResponse = schema.parse(response)

  return {
    extractedText: parsedResponse.extracted_text,
    pages: parsedResponse.pages,
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
    // The file needs to be properly added as a Blob/File object, not as a string
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
      // @ts-expect-error FormData is the correct type for file uploads. API is not typed correctly.
      body,
    })

    if (error) {
      throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }

    return parseAPIResponse(data)
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to process OCR request",
    )
  }
}
