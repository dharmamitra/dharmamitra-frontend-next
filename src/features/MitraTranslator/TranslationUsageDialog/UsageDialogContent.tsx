import React from "react"
import { useTranslations } from "next-intl"
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"

const noticeListKeys = ["1", "2", "3"] as const

export default function UsageDialogContent({ dense }: { dense?: boolean }) {
  const t = useTranslations("translation")

  return (
    <Box>
      <h2>{t("usageH2")}</h2>

      <Typography variant={dense ? "body2" : "body1"}>
        {t(`usageNoticeLong.p1`)}
      </Typography>
      <List
        dense={dense}
        sx={{
          listStyleType: "disc",
          pl: 4,
          "& .MuiListItem-root": {
            display: "list-item",
            pl: 1,
            py: 0.25,
          },
        }}
      >
        {noticeListKeys.map((key) => (
          <ListItem key={`usage-notice-list-${key}`}>
            <ListItemText primary={t(`usageNoticeLong.ul.${key}`)} />
          </ListItem>
        ))}
      </List>

      <Typography variant={dense ? "body2" : "body1"}>
        {t(`usageNoticeLong.p2`)}
      </Typography>
    </Box>
  )
}
