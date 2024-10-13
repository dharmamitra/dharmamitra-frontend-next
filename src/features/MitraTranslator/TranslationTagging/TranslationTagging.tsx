"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import Button from "@mui/material/Button"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useQuery } from "@tanstack/react-query"

import { DMFetchApi } from "@/api"
import { useTargetLangParam } from "@/hooks/params"
import useTaggingRequestBody from "@/hooks/translation/useTaggingRequestBody"

import TaggingDrawer from "./TaggingDrawer"
import styles from "./TranslationTagging.module.css"

const defaultSmDrawerWidth = "95%"
const defaultLgDrawerWidth = 700

export default function TranslationTagging() {
  const t = useTranslations("translation")

  const [open, setOpen] = React.useState(false)

  const isSmallScreen = useMediaQuery("(max-width:750px)")
  const [drawerWidth, setDrawerWidth] = React.useState<string | number>(
    defaultSmDrawerWidth,
  )

  const [targetLanguageParam] = useTargetLangParam()
  const requestBody = useTaggingRequestBody()

  const { data, refetch } = useQuery({
    queryKey: DMFetchApi.tagging.makeQueryKey(requestBody),
    queryFn: () => {
      return DMFetchApi.tagging.call(requestBody)
    },
    enabled: false,
    retry: false,
  })

  React.useEffect(() => {
    if (
      !requestBody.input_sentence ||
      requestBody.input_encoding !== "auto" ||
      targetLanguageParam !== "english"
    ) {
      return
    }

    refetch()
  }, [requestBody, targetLanguageParam, refetch])

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    },
    [open],
  )

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  React.useEffect(() => {
    setDrawerWidth(isSmallScreen ? defaultSmDrawerWidth : defaultLgDrawerWidth)

    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open, isSmallScreen])

  if (!data?.sentences) return null

  return (
    <>
      <div>
        <Button
          variant="outlined"
          onClick={() => setOpen((prev) => !prev)}
          color="secondary"
          aria-label={t("tagging.ariaLabel")}
          className={styles.button}
        >
          {t("tagging.label")}
        </Button>
      </div>

      <TaggingDrawer
        open={open}
        setOpen={setOpen}
        drawerWidth={drawerWidth}
        setDrawerWidth={setDrawerWidth}
      />
    </>
  )
}
