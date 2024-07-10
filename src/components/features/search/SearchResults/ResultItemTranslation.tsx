import React from "react"
import { useTranslations } from "next-intl"
import { Divider } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import EnIcon from "@/components/icons/EnIcon"

type Result = {
  translation?: string
}

export default function ResultItemTranslation({ translation }: Result) {
  const t = useTranslations("generic")

  if (!translation) return null

  return (
    <Box sx={{ mb: 2 }}>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <div>
          <EnIcon
            size={0.7}
            color="#bbb"
            aria-label={t("englishTranslation")}
          />
        </div>

        <Typography
          variant="body2"
          p="0"
          color="text.secondary"
          sx={{
            lineHeight: "1.15",
            fontFamily: "monospace",
          }}
        >
          {translation}
        </Typography>
      </Box>
    </Box>
  )
}
