import React from "react"
import { useTranslations } from "next-intl"
import { Box, RadioGroup } from "@mui/material"
import Typography from "@mui/material/Typography"

export const boxSx = {
  "@keyframes shimmer": {
    xs: {
      to: {
        backgroundPositionX: "0%",
      },
    },
  },
  height: "2rem",
  background: {
    xs: "linear-gradient(-45deg, #eee 40%, #fafafa 50%, #eee 60%)",
    md: "linear-gradient(-45deg, #f6f6f6 40%, #fafafa 50%, #f6f6f6 60%)",
  },
  backgroundSize: { xs: "300%" },
  backgroundPositionX: { xs: "100%" },
  animation: { xs: "shimmer 1s infinite linear" },
  borderRadius: "0.5rem",
  p: 1,

  alignItems: "center",
}

export default function OptionsLoading({
  options,
  i18nKey,
}: {
  options: string[]
  i18nKey: "encodings" | "targetLanguages" | "models" | "grammar"
}) {
  const t = useTranslations(`translation.${i18nKey}`)
  return (
    <RadioGroup
      aria-label="loading"
      value="option"
      sx={{
        gap: 2.65,
        pl: 0,
        ml: "-3px",
      }}
      row
    >
      <Box sx={{ display: "flex" }}>
        <Typography component="div" variant="body1">
          {t(options[0] as keyof Messages["translation"][typeof i18nKey])}
        </Typography>
      </Box>

      {options.slice(1, 3).map((option) => (
        <Box
          key={`translation-setting-loader-${i18nKey}-${option}`}
          sx={{
            display: { xs: "none", sm: "flex", md: "none", lg: "flex" },
          }}
        >
          <Typography component="div" variant="body1">
            {t(option as keyof Messages["translation"][typeof i18nKey])}
          </Typography>
        </Box>
      ))}

      <Box sx={{ display: "flex" }}>
        <Typography component="div" variant="body1">
          {/* TODO: i18n */}
          Other
        </Typography>
      </Box>
    </RadioGroup>
  )
}
