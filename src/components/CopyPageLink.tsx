import React from "react"
import { useTranslations } from "next-intl"
import ShareIcon from "@mui/icons-material/Share"
import { IconButton } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"

export default function CopyPageLink() {
  const t = useTranslations("generic")
  const [toolTip, setToolTip] = React.useState<string>(t("copyLink"))

  const copyLink = React.useCallback(async () => {
    const link = window.location.href

    if (link) {
      await navigator.clipboard.writeText(link)
      setToolTip(t("copied"))
    }
  }, [t])

  return (
    <>
      <Tooltip title={toolTip} placement="top">
        <IconButton
          aria-label={t("copyLink")}
          color="secondary"
          onClick={copyLink}
          onMouseLeave={() =>
            setTimeout(() => {
              setToolTip(t("copyLink"))
            }, 500)
          }
        >
          <ShareIcon color="action" fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  )
}
