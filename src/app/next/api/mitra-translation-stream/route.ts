import { NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"

import { mitraTranslate } from "@/lib/ai/providers"
import { validateModel } from "@/utils/api/global/validators"

import { createForwardedHeaders } from "../utils"

export const maxDuration = 30

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({
    message: "Namo tassa bhagavato arahato sammaṅgamānuyo!",
  })
}

// https://github.com/vercel/ai/discussions/4070
// example: https://github.com/adithya04dev/csql-agent/blob/main/chatbot/lib/ai/models.ts

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()

    const { input_sentence, target_lang, input_encoding, model } = requestBody

    const providerModel = validateModel(model) ? model : "default"

    const responseStream = streamText({
      model: mitraTranslate(providerModel),
      messages: [{ role: "user", content: input_sentence }],
      temperature: 0.1,
      headers: createForwardedHeaders(request.headers),
      providerOptions: {
        "mitra-translate": {
          target_lang,
          input_encoding,
        },
      },
    })

    return responseStream.toTextStreamResponse()
  } catch (error) {
    console.error("Translation stream route error: ", error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
