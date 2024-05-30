import React from "react"
import dynamic from "next/dynamic"

const LazyTranslationTaggingDeawerButton = dynamic(
  () => import("./LazyTranslationTaggingDeawerButton"),
)

export default function TranslationTaggingDeawerButton() {
  return <LazyTranslationTaggingDeawerButton />
}
