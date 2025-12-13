import { NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"

import { createForwardedHeaders } from "../utils"

import { mitraExplore } from "@/lib/ai/providers"
import { validateModel } from "@/utils/api/global/validators"

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

    const {
      model,
      search_input,
      locale,
      input_encoding,
      search_type,
      filter_source_language,
      filter_target_language,
      source_filters,
    } = requestBody

    const providerModel = validateModel(model) ? model : "default"

    const responseStream = streamText({
      model: mitraExplore(providerModel),
      messages: [{ role: "user", content: search_input }],
      temperature: 0.1,
      headers: createForwardedHeaders(request.headers),
      providerOptions: {
        "mitra-explore": {
          locale,
          input_encoding,
          search_type,
          filter_source_language,
          filter_target_language,
          source_filters,
        },
      },
    })

    return responseStream.toTextStreamResponse()
  } catch (error) {
    console.error("Search stream route error: ", error)
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
