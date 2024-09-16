"use client"

import { useEffect } from "react"

import useAppConfig from "@/hooks/useAppConfig"
// import { translationParamsNames } from "@/utils/api/translation/params"
import { searchParamsNames } from "@/utils/api/search/params"
import { localStorageKeys } from "@/utils/constants"

const { storageVersionId: storageVersionIdKey } = localStorageKeys

// https://vscode.dev/github/dharmamitra/dharmamitra-frontend-next/blob/working

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
      localStorage.removeItem(searchParamsNames.primary.filter_language)
      localStorage.removeItem(searchParamsNames.parallel.filter_source_language)
      localStorage.removeItem(searchParamsNames.parallel.filter_target_language)
    }
  }, [storageVersionId])

  return null
}

/*

As of storage-id 1:

src/hooks/search/useSearchCommonParams.tsx
  64,7:       localStorage.setItem(search_target, value ?? "")
  85,7:       localStorage.setItem(search_type, value ?? "")

src/hooks/search/useSearchParallelParams.tsx
  31,7:       localStorage.setItem(filter_source_language, value ?? "")
  51,7:       localStorage.setItem(filter_target_language, value ?? "")

src/hooks/search/useSearchPrimaryParams.tsx
  31,7:       localStorage.setItem(filter_language, value ?? "")

src/hooks/translation/useTranslationEndpointParams.tsx
  54,7:       localStorage.setItem(target_lang, newValue ?? "")
  74,7:       localStorage.setItem(model, value ?? "")

src/hooks/useGlobalParams.tsx
  33,7:       localStorage.setItem(input_encoding, value ?? defaultInputEncoding)
  52,7:       localStorage.setItem(view_param_name, value ?? defaultView)

*/
