import { NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"

import { mitra } from "@/lib/ai/providers"
import { type ModelType, modelTypes } from "@/utils/api/global/params"

export const maxDuration = 30

export const dynamic = "force-dynamic"

const validateModel = (model: unknown): model is ModelType => modelTypes.some((m) => m === model)

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

    const result = streamText({
      model: mitra(providerModel),
      messages: [{ role: "user", content: input_sentence }],
      temperature: 0.1,
      providerOptions: {
        mitra: {
          target_lang,
          input_encoding,
        },
      },
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("API route error:", error)
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
