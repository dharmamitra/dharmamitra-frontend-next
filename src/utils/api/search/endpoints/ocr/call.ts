import { parseOCRResponse } from "./handlers"

import appConfig from "@/config"
import { awaitedTryCatch } from "@/utils"

export const getOCRDataCall = async ({
  file,
  transliterateDevanagariToIAST = false,
  transliterateTibetanToWylie = false,
}: {
  file: File
  transliterateDevanagariToIAST?: boolean
  transliterateTibetanToWylie?: boolean
}) => {
  const formData = new FormData()

  formData.append("file", file, file.name)
  formData.append("transliterate_devanagari_to_iast", String(transliterateDevanagariToIAST))
  formData.append("transliterate_tibetan_to_wylie", String(transliterateTibetanToWylie))

  const url = `${appConfig.basePath}/next/api/ocr`

  const fetchQuery = await awaitedTryCatch(
    async () =>
      await fetch(url, {
        method: "POST",
        body: formData,
      }),
  )

  if (fetchQuery.error) {
    throw fetchQuery.error
  }

  const parsedResult = await awaitedTryCatch(
    async () => await parseOCRResponse(fetchQuery.result, file.name),
  )

  if (parsedResult.error) {
    throw parsedResult.error
  }

  return parsedResult.result
}
