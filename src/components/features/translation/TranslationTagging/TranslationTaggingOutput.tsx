import React from "react"
import dynamic from "next/dynamic"

const LazyTranslationTaggingOutput = dynamic(
  () => import("./LazyTranslationTaggingOutput"),
)

export default function TranslationTaggingOutput() {
  return <LazyTranslationTaggingOutput />
}
