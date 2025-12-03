"use client"

import { useTranslations } from "next-intl"
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, Link as MuiLink, Typography } from "@mui/material"

import { chromeExtensionUrl, firefoxExtensionUrl } from "@/utils/constants"

type Props = {
  isRendered?: boolean
  onDismiss?: () => void
}

export default function ExtensionBannerWrapper({ isRendered = true, onDismiss }: Props) {
  if (!isRendered) {
    return null
  }

  return <ExtensionBanner onDismiss={onDismiss} />
}

function ExtensionBanner({ onDismiss }: { onDismiss?: () => void }) {
  const t = useTranslations("generic")

  return (
    <Box
      sx={{
        backgroundColor: "secondary.dark",
        color: "white",
        paddingBlock: { xs: 0.25, md: 0 },
        paddingInline: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
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
        onClick={onDismiss}
        size="small"
        sx={{
          color: "white",
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
