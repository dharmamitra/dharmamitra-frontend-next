"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { styled } from "@mui/material/styles"
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import CopyText from "@/components/CopyText"
import Error from "@/components/Error"
import LoadingDots from "@/components/LoadingDots"
import ConditionalWarning from "@/components/Warning"
import useTranslationStream from "@/hooks/translation/useTranslationStream"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"

const noticeKeys = ["p1", "p2", "p3"] as const

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "30rem",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: theme.shadows[2],
  },
}))

export default function TranslationOutput() {
  const t = useTranslations()
  const { parsedStream, exceptionI18nKey, error, isLoading } =
    useTranslationStream()
  const outputRef = React.useRef<HTMLDivElement>(null)

  const errorMessage =
    error && error.errorCode === 504
      ? t.rich("generic.exception.timeout", {
          newline: (chunks) => (
            <span style={{ display: "block" }}>{chunks}</span>
          ),
        })
      : undefined

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
    <>
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

      <BoxBottomElementsRow
        sx={{
          justifyContent: "space-between",
          animation: "fadeIn 0.7s",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        {parsedStream.length > 0 ? (
          <CustomTooltip
            title={noticeKeys.map((key) => (
              <Typography key={`usage-notice-${key}`} mb={2}>
                {t(`translation.usageNoticeLong.${key}`)}
              </Typography>
            ))}
            arrow
            placement="top"
          >
            <Typography
              variant="caption"
              color="grey.800"
              sx={{
                mx: { xs: 1, md: 0 },
                textDecoration: "underline dotted",
                textUnderlineOffset: "0.2rem",
                "&:hover": { textDecoration: "none" },
              }}
            >
              {t("translation.usageNoticeShort")}
            </Typography>
          </CustomTooltip>
        ) : (
          <div />
        )}
        <CopyText
          contentRef={outputRef}
          ariaLabel={t("translation.copyTranslation")}
        />
      </BoxBottomElementsRow>
    </>
  )
}
