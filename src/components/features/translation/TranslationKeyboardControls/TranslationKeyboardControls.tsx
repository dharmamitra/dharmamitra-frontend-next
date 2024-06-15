import React from "react"
import dynamic from "next/dynamic"

const KeyboardControls = dynamic(() => import("./LazyKeyboardControls"), {
  ssr: false,
})

export default function TranslationKeyboardControls() {
  return <KeyboardControls />
}
