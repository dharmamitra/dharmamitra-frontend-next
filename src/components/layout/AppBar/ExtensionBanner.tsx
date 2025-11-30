"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, Link as MuiLink, Typography } from "@mui/material"

import { chromeExtensionUrl, cookieKeys, firefoxExtensionUrl } from "@/utils/constants"

type Props = {
  isRendered?: boolean
}

export default function ExtensionBannerWrapper({ isRendered = true }: Props) {
  if (!isRendered) {
    return null
  }

  return <ExtensionBanner />
}

function ExtensionBanner() {
  const [isClosed, setIsClosed] = useState(false)
  const t = useTranslations("generic")

  const handleClose = () => {
    document.cookie = `${cookieKeys.extensionBannerClosed}=true; path=/; max-age=31536000; SameSite=Strict`
    setIsClosed(true)
  }

  if (isClosed) {
    return null
  }

  return (
    <Box
      sx={{
        backgroundColor: "secondary.dark",
        width: "100%",
        color: "white",
        paddingBlock: 0.75,
        paddingInline: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Typography
        variant="body2"
        sx={{ flexGrow: 1, fontSize: "0.9rem", textTransform: "uppercase" }}
      >
        {t.rich("extensionCTA", {
          chromelink: (chunk) => (
            <MuiLink
              href={chromeExtensionUrl}
              color="inherit"
              underline="always"
              sx={{ fontWeight: "bold", "&:hover": { opacity: 0.9 } }}
            >
              {chunk}
            </MuiLink>
          ),
          firefoxlink: (chunk) => (
            <MuiLink
              href={firefoxExtensionUrl}
              color="inherit"
              underline="always"
              sx={{ fontWeight: "bold", "&:hover": { opacity: 0.9 } }}
            >
              {chunk}
            </MuiLink>
          ),
        })}
      </Typography>
      <IconButton
        onClick={handleClose}
        size="small"
        sx={{
          color: "white",
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          "&:hover": {
            opacity: 0.9,
          },
        }}
        aria-label="close extension banner"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}
