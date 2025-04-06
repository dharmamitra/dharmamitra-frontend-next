// 413 errors fail silently see: https://github.com/vercel/next.js/discussions/77368
// input file size validation must be done by client beforehand in alignment
// with the bodySizeLimit config value.

"use server"

import { getOCRData } from "./query"

export const getOCRDataAction = async ({
  file,
  transliterateDevanagariToIAST = false,
  transliterateTibetanToWylie = false,
}: {
  file: File
  transliterateDevanagariToIAST?: boolean
  transliterateTibetanToWylie?: boolean
}) => {
  const query = new URLSearchParams()
  query.set(
    "transliterate_devanagari_to_iast",
    String(transliterateDevanagariToIAST),
  )
  query.set(
    "transliterate_tibetan_to_wylie",
    String(transliterateTibetanToWylie),
  )

  return getOCRData({ file, query })
}
