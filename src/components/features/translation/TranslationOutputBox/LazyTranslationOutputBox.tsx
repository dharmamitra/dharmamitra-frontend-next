"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import CopyText from "@/components/CopyText"
import Error from "@/components/Error"
import LoadingDots from "@/components/LoadingDots"
import { PopperWithRef } from "@/components/styled"
import ConditionalWarning from "@/components/Warning"
import useTranslationStream from "@/hooks/translation/useTranslationStream"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"
import UsageDialogContent from "../TranslationUsageDialog/UsageDialogContent"

const noticeButtonId = "usage-notice-button"

const styles = {
  bottomRow: {
    justifyContent: "space-between",
    animation: "fadeIn 0.7s",
    "@keyframes fadeIn": {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  },
  noticeButton: {
    fontSize: "0.9rem",
    color: "grey.800",
    mx: { xs: 1, md: 0 },
    textAlign: "left",
    textTransform: "none",
    textDecoration: "underline dotted",
    textUnderlineOffset: "0.2rem",
    "&:hover": { textDecoration: "none", backgroundColor: "transparent" },
  },
}

export default function TranslationOutput() {
  const t = useTranslations()
  const { parsedStream, exceptionI18nKey, error, isLoading } =
    useTranslationStream()
  const outputRef = React.useRef<HTMLDivElement>(null)

  const errorMessage = React.useMemo(() => {
    return error && error.errorCode === 504
      ? t.rich("generic.exception.timeout", {
          newline: (chunks) => (
            <span style={{ display: "block" }}>{chunks}</span>
          ),
        })
      : undefined
  }, [t, error])

  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const [isUsageNoticeOpen, setIsUsageNoticeOpen] = React.useState(false)

  React.useEffect(() => {
    if (!isUsageNoticeOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !(event.target instanceof HTMLButtonElement)
      ) {
        setIsUsageNoticeOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isUsageNoticeOpen, setIsUsageNoticeOpen, tooltipRef])

  if (error) {
    return <Error message={errorMessage} />
  }

  if (exceptionI18nKey && !exceptionI18nKey.includes("Warning")) {
    return <Error message={t(`generic.exception.${exceptionI18nKey}`)} />
  }

  if (isLoading) {
    return <LoadingDots sx={{ m: 2 }} />
  }

  return (
    <Box
      sx={{
        display: "grid",
        minHeight: "100%",
        gridTemplateRows: "1fr auto",
      }}
    >
      <Box>
        <div ref={outputRef}>
          {parsedStream?.map((paragraph, index) => {
            return (
              <Typography
                key={`translation-stream-${index}`}
                sx={{
                  whiteSpace: "pre-wrap",
                  my: index === 0 ? 0 : 1,
                }}
              >
                {paragraph}
              </Typography>
            )
          })}
        </div>

        <ConditionalWarning i18nExceptionKey={exceptionI18nKey} />
      </Box>

      <BoxBottomElementsRow sx={styles.bottomRow}>
        {parsedStream.length > 0 ? (
          <PopperWithRef
            ref={tooltipRef}
            title={<UsageDialogContent dense />}
            arrow
            placement="top"
            open={isUsageNoticeOpen}
          >
            <Button
              id={noticeButtonId}
              variant="text"
              size="small"
              sx={styles.noticeButton}
              onClick={() => setIsUsageNoticeOpen(!isUsageNoticeOpen)}
            >
              {t("translation.usageNoticeShort")}
            </Button>
          </PopperWithRef>
        ) : (
          <div />
        )}
        <CopyText
          contentRef={outputRef}
          ariaLabel={t("translation.copyTranslation")}
        />
      </BoxBottomElementsRow>
    </Box>
  )
}
