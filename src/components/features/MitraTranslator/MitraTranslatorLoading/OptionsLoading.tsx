import React from "react"
import { useTranslations } from "next-intl"
import { Box, RadioGroup } from "@mui/material"
import Typography from "@mui/material/Typography"

import { flatRadioGroupStyles } from "@/components/styled-ssr-safe"
import { getOptionI18nKeyPath } from "@/utils"
import { InputEncoding } from "@/utils/api/global/types"
import { TargetLanguage } from "@/utils/api/translation/params"

export default function OptionsLoading({
  options,
  keyBase,
}: {
  options: (InputEncoding | TargetLanguage)[]
  keyBase: "input-encoding" | "target-language"
}) {
  const t = useTranslations()

  if (options.length === 0) return null

  return (
    <Box
      sx={{
        display: "inline-flex",
        py: 1,
      }}
    >
      <RadioGroup
        aria-label="loading"
        value="option"
        row
        sx={{ ...flatRadioGroupStyles }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography component="div" variant="body1">
            {t(getOptionI18nKeyPath(options[0]))}
          </Typography>
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
              md: "none",
              lg: "flex",
            },
            gap: 3,
          }}
        >
          {options.slice(1, 3).map((option) => (
            <Typography
              key={`translation-setting-loader-${keyBase}-${option}`}
              component="div"
              variant="body1"
            >
              {t(getOptionI18nKeyPath(option))}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", ml: 1 }}>
          <Typography component="div" variant="body1">
            {t("generic.other")}
          </Typography>
        </Box>
      </RadioGroup>
    </Box>
  )
}
