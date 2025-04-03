"use client"

import React from "react"
import dynamic from "next/dynamic"

import DualFeatureMitraLoading from "./MultiFeatureMitraLoading"

const DualFeatureMitra = dynamic(() => import("./MultiFeatureMitra"), {
  loading: () => <DualFeatureMitraLoading />,
  // TODO: param refactor should mean that the ssr prop can be removed.
  ssr: false,
})

// Must use dynamic import as search params used in sub-components need to be wrapped in a suspense boundary to avoid build failure.
export default function DynamicToolSelectorTabs() {
  return <DualFeatureMitra />
}
