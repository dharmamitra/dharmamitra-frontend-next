"use client"

import React, { Activity, Suspense } from "react"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { useFeatureVisibility } from "./useFeatureVisibility"

import PageContentFrame from "@/components/layout/PageContentFrame"

const MitraTranslator = React.lazy(() => import("@/components/features/MitraTranslator"))
const MitraExplore = React.lazy(() => import("@/components/features/MitraExplore"))
const MitraSearch = React.lazy(() => import("@/components/features/MitraSearch"))
const MitraOCR = React.lazy(() => import("@/components/features/MitraOCR"))

function FeatureLoadingFallback() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default function FeatureContainer() {
  const { isFeatureVisible } = useFeatureVisibility()

  return (
    <PageContentFrame maxWidth="xl" sx={{ mb: { xs: 6, md: 14 }, flex: 1 }}>
      <Suspense fallback={<FeatureLoadingFallback />}>
        <Activity mode={isFeatureVisible("translate") ? "visible" : "hidden"}>
          <MitraTranslator />
        </Activity>

        <Activity mode={isFeatureVisible("explore") ? "visible" : "hidden"}>
          <MitraExplore />
        </Activity>

        <Activity mode={isFeatureVisible("db-search") ? "visible" : "hidden"}>
          <MitraSearchWrapper />
        </Activity>

        <Activity mode={isFeatureVisible("ocr") ? "visible" : "hidden"}>
          <MitraOCR />
        </Activity>
      </Suspense>
    </PageContentFrame>
  )
}

/**
 * Wrapper for MitraSearch to manage its local state.
 * This keeps the search controls state within the Activity boundary.
 */
function MitraSearchWrapper() {
  const [isSearchControlsOpen, setIsSearchControlsOpen] = React.useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("show-search-options") === "true"
  })

  return (
    <MitraSearch
      isSearchControlsOpen={isSearchControlsOpen}
      setIsSearchControlsOpen={setIsSearchControlsOpen}
    />
  )
}
