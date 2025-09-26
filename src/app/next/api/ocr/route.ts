import { NextRequest, NextResponse } from "next/server"
import {
  Agent,
  fetch as undiciFetch,
  FormData as UndiciFormData,
  Response as UndiciResponse,
} from "undici"

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

async function handleFileResponse(response: UndiciResponse) {
  const contentDisposition = response.headers.get("content-disposition")
  if (!contentDisposition) return null

  const contentType = response.headers.get("content-type") || "application/octet-stream"
  const arrayBuffer = await response.arrayBuffer()

  return new NextResponse(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
    },
  })
}

async function handleJsonResponse(response: UndiciResponse) {
  const responseData = await response.json()
  return NextResponse.json(responseData)
}

async function fetchOCRData(body: UndiciFormData, query: URLSearchParams) {
  const longAgent = new Agent({
    // disable timeouts to prevent long-running requests from being aborted
    headersTimeout: 0,
    bodyTimeout: 0,
  })

  const url = `${searchBaseUrl}/ocr/?${query}`

  return await undiciFetch(url, {
    method: "POST",
    headers: {
      "X-Key": process.env.DM_API_KEY ?? "",
    },
    body,
    // Non-standard option recognized by Node's fetch (Undici)
    dispatcher: longAgent,
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

  const formDataResult = await awaitedTryCatch(async () => await request.formData())
  if (formDataResult.error) {
    return NextResponse.json(formDataResult.error, { status: 400 })
  }

  const formData = formDataResult.result
  const file = formData.get("file")

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is not a File object" }, { status: 400 })
  }

  const transliterateDevanagariToIAST = formData.get("transliterate_devanagari_to_iast") === "true"
  const transliterateTibetanToWylie = formData.get("transliterate_tibetan_to_wylie") === "true"

  const query = new URLSearchParams()
  query.set("transliterate_devanagari_to_iast", String(transliterateDevanagariToIAST))
  query.set("transliterate_tibetan_to_wylie", String(transliterateTibetanToWylie))

  const apiFormData = new UndiciFormData()
  apiFormData.append("file", file, file.name)

  const fetchResult = await awaitedTryCatch(async () => fetchOCRData(apiFormData, query))

  if (fetchResult.error) {
    console.error("FETCH ERROR:", JSON.stringify(fetchResult.error))
    return NextResponse.json(fetchResult.error, { status: fetchResult.error.status ?? 500 })
  }

  const response = fetchResult.result

  const fileResponse = await awaitedTryCatch(async () => handleFileResponse(response))

  if (fileResponse.error) {
    console.error("FILE RESPONSE ERROR:", fileResponse.error)
    return NextResponse.json(fileResponse.error, { status: fileResponse.error.status ?? 500 })
  }

  if (fileResponse.result) {
    return fileResponse.result
  }

  const jsonResult = await awaitedTryCatch(async () => handleJsonResponse(response))

  if (jsonResult.error) {
    console.error("JSON RESPONSE ERROR:", jsonResult.error)
    return NextResponse.json(jsonResult.error, { status: jsonResult.error.status ?? 500 })
  }

  return jsonResult.result
}
