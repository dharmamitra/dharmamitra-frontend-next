"use client"

import React from "react"
import dynamic from "next/dynamic"

import LoadingToolSelectorTabs from "./LoadingToolSelectorTabs"

const LazyToolSelectorTabs = dynamic(() => import("./LazyToolSelectorTabs"), {
  loading: () => <LoadingToolSelectorTabs />,
  ssr: false,
})

export default function ToolSelectorTabs() {
  return <LazyToolSelectorTabs />
}
