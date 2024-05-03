import React from "react"
import { useLocale, useTranslations } from "next-intl"
import LanguageIcon from "@mui/icons-material/Language"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { visuallyHidden } from "@mui/utils"

export default function DesktopLocaleSwitcherLoading() {
  const t = useTranslations("localeSwitcher")
  const locale = useLocale()

  return (
    <FormControl>
      <InputLabel id="locale-selector-label" sx={visuallyHidden}>
        {t("label")}
      </InputLabel>
      <Select
        labelId="locale-selector-label"
        id="locale-selector"
        value={locale}
        IconComponent={LanguageIcon}
        inputProps={{
          sx: {
            mr: 2,
            py: 1,
          },
        }}
      >
        <MenuItem value={locale}>
          <Typography
            variant="body2"
            sx={{ textTransform: "uppercase" }}
            lineHeight={1.5}
          >
            {t("localePlaceholder")}
          </Typography>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
