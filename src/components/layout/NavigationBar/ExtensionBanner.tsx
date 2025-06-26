"use client"

import React, { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, Link as MuiLink, Typography } from "@mui/material"

import { chromeExtensionUrl, firefoxExtensionUrl, localStorageKeys } from "@/utils/constants"

export default function ExtensionBanner() {
  const t = useTranslations("generic")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const bannerClosed = localStorage.getItem(localStorageKeys.extensionBannerClosed)
    if (bannerClosed !== "true") {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem(localStorageKeys.extensionBannerClosed, "true")
    setIsVisible(false)
  }

  return (
    <Box
      sx={{
        backgroundColor: "secondary.dark",
        width: "100%",
        color: "white",
        height: isVisible ? "auto" : 0,
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transition: "height 0.3s ease-in-out, opacity 0.3s ease-in-out",
        paddingBlock: isVisible ? 0.75 : 0,
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
