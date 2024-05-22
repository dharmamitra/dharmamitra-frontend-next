import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  return new Response("Namo tassa bhagavato arahato sammāsambuddhassa.", {
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  })
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json()

  const url = `${process.env.NEXT_PUBLIC_DM_API_BASE_URL}/translation-exp/`
  const apiKey = process.env.DM_API_KEY ?? ""

  try {
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        "X-Key": apiKey,
      },
      body: JSON.stringify(requestBody),
    })

    if (!fetchResponse.ok) {
      return new NextResponse(
        `Opening stream error: response not ok. ${fetchResponse.statusText}`,
        {
          status: fetchResponse.status,
        },
      )
    }

    if (
      !fetchResponse.headers
        .get("content-type")
        ?.startsWith("text/event-stream")
    ) {
      return new NextResponse("Opening stream error: invalid event stream", {
        status: fetchResponse.status,
      })
    }

    // Stream the response back to the client
    return new NextResponse(fetchResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    return new NextResponse(`Opening stream error: ${JSON.stringify(error)}`, {
      status: 500,
    })
  }
}
