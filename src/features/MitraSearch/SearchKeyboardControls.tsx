"use client"

import React from "react"

import { useSearchTargetParam } from "@/hooks/params"
import {
  useParallelSearchQuery,
  usePrimarySearchQuery,
} from "@/hooks/search/queries"

import { handleSearchKeyPress } from "./utils"

type Props = {
  input: string
}

export default function SearchKeyboardControls(props: Props) {
  const [searchTarget] = useSearchTargetParam()

  switch (searchTarget) {
    case "primary":
      return <PrimarySearchKeyControls {...props} />
    case "parallel":
      return <ParallelSearchKeyControls {...props} />
    default:
      return null
  }
}

function PrimarySearchKeyControls({ input }: Props) {
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

function ParallelSearchKeyControls({ input }: Props) {
  const { refetch } = useParallelSearchQuery(input)

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
