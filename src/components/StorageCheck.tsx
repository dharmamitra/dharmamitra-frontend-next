"use client"

import { useEffect } from "react"

import useAppConfig from "@/hooks/useAppConfig"
import { localStorageKeys } from "@/utils/constants"

export default function StorageCheck() {
  const { storageVersionId } = useAppConfig()

  useEffect(() => {
    const clientStorageId = localStorage.getItem(localStorageKeys.storageVersionId)

    if (clientStorageId === storageVersionId) return

    localStorage.setItem(localStorageKeys.storageVersionId, storageVersionId)

    if (storageVersionId === "nuke") {
      localStorage.clear()
    } else {
      // targeted props for given version
      localStorage.removeItem(localStorageKeys.extensionBannerClosed)
    }
  }, [storageVersionId])

  return null
}
