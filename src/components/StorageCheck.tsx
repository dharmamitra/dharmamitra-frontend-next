"use client"

import { useEffect } from "react"

import useAppConfig from "@/hooks/useAppConfig"
import { searchParamsNames } from "@/utils/api/search/params"
import { localStorageKeys } from "@/utils/constants"

const { storageVersionId: storageVersionIdKey } = localStorageKeys

export default function StorageCheck() {
  const { storageVersionId } = useAppConfig()

  useEffect(() => {
    const localStorageId = localStorage.getItem(storageVersionIdKey)

    if (localStorageId === storageVersionId) return

    localStorage.setItem(storageVersionIdKey, storageVersionId)

    if (storageVersionId === "nuke") {
      localStorage.clear()
    } else {
      // targeted props for given version
      localStorage.removeItem(searchParamsNames.api.filter_source_language)
      localStorage.removeItem(searchParamsNames.api.filter_target_language)
    }
  }, [storageVersionId])

  return null
}
