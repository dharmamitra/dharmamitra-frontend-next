import React from "react"
import dynamic from "next/dynamic"

import MitraTranslatorLoading from "./MitraTranslatorLoading"

const MitraTranslator = dynamic(() => import("./MitraTranslator"), {
  loading: () => <MitraTranslatorLoading />,
})

// Must use dynamic import as search params used in sub-components need to be wrapped in a suspense boundary to avoid build failure.
export default function DynamicMitraTranslator() {
  return <MitraTranslator />
}
