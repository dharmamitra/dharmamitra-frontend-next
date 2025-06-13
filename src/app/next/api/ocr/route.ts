import { NextRequest, NextResponse } from "next/server"

import { awaitedTryCatch } from "@/utils"
import { searchBaseUrl } from "@/utils/api/client"

export const dynamic = "force-dynamic"

export async function GET() {
  return new Response("Namo tassa bhagavato arahato sammāsambuddhassa.", {
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  })
}

async function handleFileResponse(response: Response) {
  const contentDisposition = response.headers.get("content-disposition")
  if (!contentDisposition) return null

  const fileBlob = await response.blob()

  return new NextResponse(fileBlob, {
    status: 200,
    headers: {
      "Content-Type": fileBlob.type || "application/octet-stream",
      "Content-Disposition": contentDisposition,
    },
  })
}

async function handleJsonResponse(response: Response) {
  const responseData = await response.json()
  return NextResponse.json(responseData)
}

async function fetchOCRData(body: FormData, query: URLSearchParams) {
  const url = `${searchBaseUrl}/ocr/?${query}`
  return await fetch(url, {
    method: "POST",
    headers: {
      "X-Key": process.env.DM_API_KEY ?? "",
    },
    body,
  })
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || ""
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Invalid content type. Expected multipart/form-data" },
      { status: 400 },
    )
  }

  const formDataResult = await awaitedTryCatch(
    async () => await request.formData(),
  )
  if (formDataResult.error) {
    return NextResponse.json(formDataResult.error, { status: 400 })
  }

  const formData = formDataResult.result
  const file = formData.get("file")

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "File is not a File object" },
      { status: 400 },
    )
  }

  const transliterateDevanagariToIAST =
    formData.get("transliterate_devanagari_to_iast") === "true"
  const transliterateTibetanToWylie =
    formData.get("transliterate_tibetan_to_wylie") === "true"

  const query = new URLSearchParams()
  query.set(
    "transliterate_devanagari_to_iast",
    String(transliterateDevanagariToIAST),
  )
  query.set(
    "transliterate_tibetan_to_wylie",
    String(transliterateTibetanToWylie),
  )

  const apiFormData = new FormData()
  apiFormData.append("file", file, file.name)

  const fetchResult = await awaitedTryCatch(async () =>
    fetchOCRData(apiFormData, query),
  )

  if (fetchResult.error) {
    return NextResponse.json(fetchResult.error, { status: 500 })
  }

  const response = fetchResult.result

  const fileResponse = await awaitedTryCatch(async () =>
    handleFileResponse(response),
  )

  if (fileResponse.error) {
    return NextResponse.json(fileResponse.error, { status: 500 })
  }

  if (fileResponse.result) {
    return fileResponse.result
  }

  const jsonResult = await awaitedTryCatch(async () =>
    handleJsonResponse(response),
  )

  if (jsonResult.error) {
    return NextResponse.json(jsonResult.error, { status: 500 })
  }

  return jsonResult.result
}
