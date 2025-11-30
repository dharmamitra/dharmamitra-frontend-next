import { NextRequest, NextResponse } from "next/server"
import { FormData as UndiciFormData } from "undici"

import { fetchOCRData, handleFileResponse, handleJsonResponse } from "./handlers"

import { awaitedTryCatch } from "@/utils"

export const maxDuration = 3600 // 1hr

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  return new Response("Namo tassa bhagavato arahato sammāsambuddhassa.", {
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
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

  const { result: formData, error: formDataError } = await awaitedTryCatch(
    async () => await request.formData(),
  )
  if (formDataError) {
    return NextResponse.json(formDataError, { status: 400 })
  }

  const requestFile = formData.get("file")

  if (!requestFile) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (!(requestFile instanceof File)) {
    return NextResponse.json({ error: "File is not a File object" }, { status: 400 })
  }

  const transliterateDevanagariToIAST = formData.get("transliterate_devanagari_to_iast") === "true"
  const transliterateTibetanToWylie = formData.get("transliterate_tibetan_to_wylie") === "true"

  const query = new URLSearchParams()
  query.set("transliterate_devanagari_to_iast", String(transliterateDevanagariToIAST))
  query.set("transliterate_tibetan_to_wylie", String(transliterateTibetanToWylie))

  const endpointRequestBody = new UndiciFormData()
  endpointRequestBody.append("file", requestFile, requestFile.name)

  const startedAt = Date.now()

  const fetchResult = await fetchOCRData({
    headers: request.headers,
    body: endpointRequestBody,
    query,
  })

  if (!fetchResult.ok) {
    console.error({
      startedAt,
      failedAt: Date.now(),
      fetchError: fetchResult.status,
    })
    return NextResponse.json(fetchResult, { status: fetchResult.status })
  }

  const { result: fileResponse, error: fileResponseError } = await awaitedTryCatch(async () =>
    handleFileResponse(fetchResult),
  )

  if (fileResponseError) {
    console.error({
      startedAt,
      failedAt: Date.now(),
      fileResponseError,
    })
    return NextResponse.json(fileResponseError, { status: fileResponseError.status ?? 500 })
  }

  if (fileResponse) {
    return fileResponse
  }

  const { result: jsonResponse, error: jsonResponseError } = await awaitedTryCatch(async () =>
    handleJsonResponse(fetchResult),
  )

  if (jsonResponseError) {
    console.error({
      startedAt,
      failedAt: Date.now(),
      jsonResponseError,
    })
    return NextResponse.json(jsonResponseError, { status: jsonResponseError.status ?? 500 })
  }

  return jsonResponse
}
