"use client"

import React from "react"

import { handleSearchKeyPress } from "../utils"

import { usePrimarySearchQuery } from "@/hooks/search/queries"

type Props = {
  input: string
}

export default function SearchKeyboardControls({ input }: Props) {
  const { refetch } = usePrimarySearchQuery(input)

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      handleSearchKeyPress(event, refetch)
    }
    window.addEventListener("keydown", handler)
    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [refetch])

  return null
}
