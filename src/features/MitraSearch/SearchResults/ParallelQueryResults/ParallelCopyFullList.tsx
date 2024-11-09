import React from "react"
import { useTranslations } from "next-intl"
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined"
import { IconButton } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"

import { SearchApiTypes } from "@/api"

export default function ParallelCopyFullList({
  results,
}: {
  results: SearchApiTypes.Response<"/parallel/">["results"]
}) {
  const t = useTranslations("generic")
  const [toolTip, setToolTip] = React.useState<string>(
    t("copy.copyResultsList"),
  )

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
        return `${t("source").toUpperCase()}:\n${src_segmentnr}\n${src_title}\n${src_link}\n(${src_lang})\n${src_text.text_main}\n${t("target").toUpperCase()}:\n${tgt_segmentnr}\n${tgt_title}\n${tgt_link}\n(${tgt_lang})\n${tgt_text.text_main}`
      })
      .join("\n\n")

    if (content) {
      await navigator.clipboard.writeText(content)
      setToolTip(t("copy.copied"))
    }
  }, [results, t])

  return (
    <>
      <Tooltip title={toolTip} placement="top">
        <IconButton
          aria-label={t("copy.copyResultsList")}
          color="secondary"
          onClick={copyContent}
          onMouseLeave={() =>
            setTimeout(() => {
              setToolTip(t("copy.copyResultsList"))
            }, 500)
          }
        >
          <FeedOutlinedIcon color="action" fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  )
}
