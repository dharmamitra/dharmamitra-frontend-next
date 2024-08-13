"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { Box, Button, Typography } from "@mui/material"

import { localStorageKeys } from "@/utils/constants"

const dialogId = "translation-usage-dialog"
const noticeKeys = ["p1", "p2", "p3"] as const

export default function LazyUsageDialog() {
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
      <h2>{t("usageH2")}</h2>
      <Box>
        {noticeKeys.map((key) => (
          <Typography key={`usage-notice-${key}`} mb={2}>
            {t(`usageNoticeLong.${key}`)}
          </Typography>
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{ alignSelf: "flex-end" }}
        onClick={closeDialog}
      >
        {t("usageAccept")}
      </Button>
    </dialog>
  )
}
