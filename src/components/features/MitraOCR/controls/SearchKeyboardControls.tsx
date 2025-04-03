"use client"

import React from "react"

import { usePrimarySearchQuery } from "@/hooks/search/queries"

import { handleOCRKeyPress } from "../utils"

type Props = {
  input: string
}

export default function OCRKeyboardControls({ input }: Props) {
  const { refetch } = usePrimarySearchQuery(input)

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      handleOCRKeyPress(event, refetch)
    }
    window.addEventListener("keydown", handler)
    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [refetch])

  return null
}
