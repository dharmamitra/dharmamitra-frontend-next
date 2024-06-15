import React from "react"
import dynamic from "next/dynamic"

const LazyTranslationTaggingDrawer = dynamic(
  () => import("./LazyTranslationTaggingDrawer"),
)

export default function TranslationTaggingDrawer() {
  return <LazyTranslationTaggingDrawer />
}
