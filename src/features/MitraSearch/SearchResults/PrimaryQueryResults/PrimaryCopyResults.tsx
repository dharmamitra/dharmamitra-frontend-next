import React from "react"
import { useTranslations } from "next-intl"
import { IconButton } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"

import { SearchApiTypes } from "@/api"

import { tipMsgs } from "../ParallelQueryResults/ParallelCopyResults"
import ResultsListCopyIcon, {
  type ResultsListCopyType,
} from "../ResultsListCopyIcon"

type PrimaryCopyResultsProps = {
  results: SearchApiTypes.Response<"/primary/">["results"]
  type: ResultsListCopyType
}

export default function PrimaryCopyResults({
  results,
  type,
}: PrimaryCopyResultsProps) {
  const t = useTranslations("generic.copy")
  const [toolTip, setToolTip] = React.useState<string>(t(tipMsgs[type]))

  const copyContent = React.useCallback(async () => {
    const content = results
      .map((result) => {
        const { lang, src_link, title, segmentnr, text } = result
        const resultBase = `${segmentnr}\n${title}\n${src_link}\n(${lang})`

        if (type === "refs") {
          return resultBase
        }

        return `${resultBase}\n${text}`
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
          aria-label={t(tipMsgs[type])}
          color="secondary"
          sx={{ mt: 0.25 }}
          onClick={copyContent}
          onMouseLeave={() =>
            setTimeout(() => {
              setToolTip(t(tipMsgs[type]))
            }, 500)
          }
        >
          <ResultsListCopyIcon type={type} />
        </IconButton>
      </Tooltip>
    </>
  )
}
