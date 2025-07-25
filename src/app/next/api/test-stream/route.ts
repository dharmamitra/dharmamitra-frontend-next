import { NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"

import { mitraTest } from "@/lib/ai/providers"
import { composeMessageProps } from "@/lib/ai/server-side-utils"

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
    const { input_sentence } = await request.json()

    const result = streamText({
      model: mitraTest("gpt-3.5-turbo"),
      messages: composeMessageProps(input_sentence),
      temperature: 0.1,
      providerOptions: {
        "dharma-mitra": { stream: true },
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
