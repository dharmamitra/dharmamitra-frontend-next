import React from "react"
import dynamic from "next/dynamic"

import { type DMApi } from "@/api"

const LazyTranslationTaggingOutput = dynamic(
  () => import("./LazyTranslationTaggingOutput"),
)

export default function TranslationTaggingOutput({
  taggingData,
}: {
  taggingData: DMApi.TaggingResponse
}) {
  return <LazyTranslationTaggingOutput taggingData={taggingData} />
}
