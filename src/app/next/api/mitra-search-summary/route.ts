import { NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"

import { mitraSearchSummary } from "@/lib/ai/providers"
import { validateModel } from "@/utils/api/global/validators"

import { createStreamHeaders } from "../utils"

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

    const { messages, locale, model, ...searchResult } = requestBody

    const providerModel = validateModel(model) ? model : "default"

    const result = streamText({
      model: mitraSearchSummary(providerModel),
      messages,
      temperature: 0.1,
      headers: createStreamHeaders(request.headers),
      providerOptions: {
        "mitra-search-summary": {
          locale,
          search_result: searchResult,
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
