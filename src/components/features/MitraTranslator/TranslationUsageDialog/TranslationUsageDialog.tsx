"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { Button } from "@mui/material"

import { localStorageKeys } from "@/utils/constants"

import UsageDialogContent from "./UsageDialogContent"

const dialogId = "translation-usage-dialog"

export default function TranslationUsageDialog() {
  const t = useTranslations("translation")

  React.useEffect(() => {
    const isTranslationUsageAccepted = !!localStorage.getItem(
      localStorageKeys.translationUsageAccepted,
    )
    if (isTranslationUsageAccepted) return
    const dialog = document.getElementById(dialogId) as HTMLDialogElement

    if (dialog) {
      dialog.style.display = "flex"
      dialog.showModal()
    }
  }, [])

  const closeDialog = React.useCallback(() => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement
    if (dialog) {
      dialog.style.display = "none"
      dialog.close()
    }

    localStorage.setItem(localStorageKeys.translationUsageAccepted, "true")
  }, [])

  return (
    <dialog
      id={dialogId}
      style={{
        zIndex: 999,
        display: "none",
        flexDirection: "column",
        maxWidth: "40rem",
      }}
    >
      <UsageDialogContent />

      <Button variant="contained" sx={{ alignSelf: "flex-end", mt: 3 }} onClick={closeDialog}>
        {t("usageAccept")}
      </Button>
    </dialog>
  )
}
