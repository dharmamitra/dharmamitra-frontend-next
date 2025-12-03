"use client"

import { usePathname } from "next/navigation"

import { featureRoutes, MitraFeature } from "@/components/layout/Sidebar"

/**
 * Hook to determine which feature is currently visible based on the pathname.
 * Returns the current feature route and a helper to check visibility.
 */
export function useFeatureVisibility() {
  const pathname = usePathname()

  const currentFeature =
    featureRoutes.find((route) => pathname.includes(`/${route}`)) ?? "translate"

  const isFeatureVisible = (feature: MitraFeature) => feature === currentFeature

  return { currentFeature, isFeatureVisible }
}
