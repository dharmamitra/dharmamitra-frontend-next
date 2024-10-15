import React from "react"
import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"

import ExceptionText from "@/components/ExceptionText"
import SkeletonGroup from "@/components/SkeletonGroup"

import ResultsHeading from "./ResultsHeading"

type NonResultCaseBlockProps = {
  hasData: boolean
  errorMessage?: string
  isLoading: boolean
  noResultsFound: boolean
}

export default function NonResultCaseBlock({
  hasData,
  errorMessage,
  isLoading,
  noResultsFound,
}: NonResultCaseBlockProps) {
  const t = useTranslations("generic")

  React.useEffect(() => {
    if (!hasData) {
      window.scrollTo(0, 0)
    }
  }, [hasData])

  if (errorMessage) {
    return <ExceptionText type="error" message={errorMessage} />
  }

  if (isLoading) {
    return <SkeletonGroup />
  }

  if (!hasData) {
    return null
  }

  if (noResultsFound) {
    return (
      <>
        <ResultsHeading />
        <Typography>{t("noResult")}</Typography>
      </>
    )
  }

  return null
}
