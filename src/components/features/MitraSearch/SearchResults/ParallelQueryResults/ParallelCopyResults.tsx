import React from "react"
import { useTranslations } from "next-intl"
import { IconButton } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"

import { SearchApiTypes } from "@/api"

import ResultsListCopyIcon, { type ResultsListCopyType } from "../ResultsListCopyIcon"

export const tipMsgs = {
  full: "copyResultsList",
  refs: "copyResultsRefs",
} as const

type ParallelCopyResultsProps = {
  results: SearchApiTypes.Response<"/parallel/">["results"]
  type: ResultsListCopyType
}

export default function ParallelCopyResults({ results, type }: ParallelCopyResultsProps) {
  const t = useTranslations("generic")
  const [toolTip, setToolTip] = React.useState<string>(t(`${tipMsgs[type]}`))

  const copyContent = React.useCallback(async () => {
    const content = results
      .map((result) => {
        const {
          src_lang,
          src_segmentnr,
          src_title,
          src_link,
          src_text,
          tgt_lang,
          tgt_segmentnr,
          tgt_title,
          tgt_text,
          tgt_link,
        } = result

        const sourceBase = `${t("source").toUpperCase()}:\n${src_segmentnr}\n${src_title}\n${src_link}\n(${src_lang})`
        const targetBase = `${t("target").toUpperCase()}:\n${tgt_segmentnr}\n${tgt_title}\n${tgt_link}\n(${tgt_lang})`

        if (type === "refs") {
          return `${sourceBase}\n${targetBase}`
        }

        return `${sourceBase}\n${src_text.text_main}\n${targetBase}\n${tgt_text.text_main}`
      })
      .join("\n\n")

    if (content) {
      await navigator.clipboard.writeText(content)
      setToolTip(t("copied"))
    }
  }, [results, type, t])

  return (
    <>
      <Tooltip title={toolTip} placement="top">
        <IconButton
          aria-label={t(`${tipMsgs[type]}`)}
          color="secondary"
          onClick={copyContent}
          onMouseLeave={() =>
            setTimeout(() => {
              setToolTip(t(`${tipMsgs[type]}`))
            }, 500)
          }
        >
          <ResultsListCopyIcon type={type} />
        </IconButton>
      </Tooltip>
    </>
  )
}
