"use client"

import { useEffect } from "react"

import useAppConfig from "@/hooks/useAppConfig"
import { globalParamsNames } from "@/utils/api/global/params"
import { localStorageKeys } from "@/utils/constants"

export default function StorageCheck() {
  const { storageVersionId } = useAppConfig()

  useEffect(() => {
    const clientStorageId = localStorage.getItem(localStorageKeys.storageVersionId)

    if (clientStorageId === storageVersionId) return

    localStorage.setItem(localStorageKeys.storageVersionId, storageVersionId)

    // nuke storage
    // localStorage.clear()

    // targeted props for given version
    localStorage.removeItem(globalParamsNames.local.view)
  }, [storageVersionId])

  return null
}
