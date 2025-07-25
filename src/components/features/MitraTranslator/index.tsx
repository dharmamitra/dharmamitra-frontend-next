"use client"

import dynamic from "next/dynamic"

import MitraTranslatorLoading from "./MitraTranslatorLoading/MitraTranslatorLoading"

const MitraTranslator = dynamic(() => import("./MitraTranslator"), {
  loading: () => <MitraTranslatorLoading />,
  ssr: false,
})

// Must use dynamic import as search params used in sub-components need to be wrapped in a suspense boundary to avoid build failure.
export default function DynamicMitraTranslator() {
  return <MitraTranslator />
}
