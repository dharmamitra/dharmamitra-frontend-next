import React from "react"
import dynamic from "next/dynamic"

const LazyStartStopButton = dynamic(() => import("./LazyStartStopButton"), {
  ssr: false,
})

export default function TranslationStartStopButton() {
  return <LazyStartStopButton />
}
