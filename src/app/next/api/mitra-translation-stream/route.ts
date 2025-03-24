import { NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"

import { mitra } from "@/lib/ai/providers"

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
    const { messages, target_language } = requestBody

    const result = streamText({
      model: mitra("gpt-3.5-turbo"),
      messages,
      temperature: 0.1,
      providerOptions: {
        "dharma-mitra": {
          stream: true,
          do_grammar: false,
          input_encoding: "default",
          target_language,
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
