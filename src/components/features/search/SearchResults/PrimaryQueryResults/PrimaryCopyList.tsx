import React from "react"
import { useTranslations } from "next-intl"
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined"
import { IconButton } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"

import { SearchApiTypes } from "@/api"

export default function PrimaryCopyList({
  results,
}: {
  results: SearchApiTypes.Response<"/primary/">["results"]
}) {
  const t = useTranslations("generic")
  const [toolTip, setToolTip] = React.useState<string>(t("copyResultsList"))

  const copyContent = React.useCallback(async () => {
    const content = results
      .map((result) => {
        const { lang, src_link, title, segmentnr, text } = result
        return `${segmentnr}\n${title}\n${src_link}\n(${lang})\n${text}`
      })
      .join("\n\n")

    if (content) {
      await navigator.clipboard.writeText(content)
      setToolTip(t("copied"))
    }
  }, [results, t])

  return (
    <>
      <Tooltip title={toolTip} placement="top">
        <IconButton
          aria-label={t("copyResultsList")}
          color="secondary"
          sx={{ mt: 0.25 }}
          onClick={copyContent}
          onMouseLeave={() =>
            setTimeout(() => {
              setToolTip(t("copyResultsList"))
            }, 500)
          }
        >
          <SummarizeOutlinedIcon color="action" fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  )
}
