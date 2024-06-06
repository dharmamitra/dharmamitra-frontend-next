"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"

import useTaggingData from "@/hooks/useTaggingData"

import styles from "./LazyTranslationTaggingDrawer.module.css"
import TranslationTaggingOutput from "./LazyTranslationTaggingOutput"

export default function LazyTranslationTaggingDrawer() {
  const t = useTranslations("translation")

  const { taggingData } = useTaggingData()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {taggingData ? (
        <Button
          variant="outlined"
          onClick={() => setOpen((prev) => !prev)}
          color="secondary"
          aria-label={t("tagging.ariaLabel")}
          className={styles.button}
        >
          {t("tagging.label")}
        </Button>
      ) : null}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen((prev) => !prev)}
      >
        <Stack direction="row" justifyContent="flex-end" pt={2} pr={2}>
          <IconButton aria-label="close">
            <CloseIcon onClick={() => setOpen((prev) => !prev)} />
          </IconButton>
        </Stack>
        <TranslationTaggingOutput taggingData={taggingData ?? []} />
      </Drawer>
    </>
  )
}
