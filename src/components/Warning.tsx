import React from "react"
import { useTranslations } from "next-intl"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import { alpha } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { warningBgFactory } from "@/components/styled"
import { ExceptionMessageKey } from "@/utils/validators"

type WarningProps = {
  i18nExceptionKey?: ExceptionMessageKey
}

/**
 * Standard warning component displays a warning message - currently can only be used inside client componets as it reliies on theme function.
 *
 */
export default function Warning({ i18nExceptionKey }: WarningProps) {
  const t = useTranslations("generic.exception")

  if (!i18nExceptionKey) return null

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        gap: 1,
        my: 3,
        p: 1.5,
        borderRadius: "6px",
        bgcolor: alpha(theme.palette.warning.main, warningBgFactory),
        border: "1px solid",
        borderColor: "warning.main",
      })}
    >
      <WarningAmberIcon
        sx={{
          color: "warning.main",
          transform: "translateY(0.10rem)",
        }}
      />
      <Typography variant="body2" fontWeight={500}>
        {t(i18nExceptionKey)}
      </Typography>
    </Box>
  )
}
