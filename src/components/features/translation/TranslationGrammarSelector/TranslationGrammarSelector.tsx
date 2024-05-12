import React from "react"
import dynamic from "next/dynamic"

const LazyModelSelector = dynamic(() => import("./LazyGrammarSelector"), {
  ssr: false,
})

export default function TranslationModelSelector() {
  return <LazyModelSelector />
}
