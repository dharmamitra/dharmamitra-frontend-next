import React from "react"
import dynamic from "next/dynamic"

const LazyTranslationUsageDialog = dynamic(
  () => import("./LazyTranslationUsageDialog"),
  {
    ssr: false,
  },
)

export default function TranslationUsageDialog() {
  return <LazyTranslationUsageDialog />
}
