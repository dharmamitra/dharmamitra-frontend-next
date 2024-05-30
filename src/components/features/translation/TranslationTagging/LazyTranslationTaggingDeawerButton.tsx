"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"

import useTaggingData from "@/hooks/useTaggingData"

import styles from "./LazyTranslationTaggingDeawerButton.module.css"
import TranslationTaggingOutput from "./LazyTranslationTaggingOutput"

export default function LazyTranslationTaggingDeawerButton() {
  const t = useTranslations("translation")

  const { taggingData } = useTaggingData()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {taggingData ? (
        <div>
          <Button
            variant="outlined"
            onClick={() => setOpen((prev) => !prev)}
            color="secondary"
            aria-label={t("tagging.ariaLabel")}
            className={styles.button}
          >
            {t("tagging.heading")}
          </Button>
        </div>
      ) : null}
      <Drawer open={open} onClose={() => setOpen((prev) => !prev)}>
        <TranslationTaggingOutput taggingData={taggingData ?? []} />
      </Drawer>
    </>
  )
}
