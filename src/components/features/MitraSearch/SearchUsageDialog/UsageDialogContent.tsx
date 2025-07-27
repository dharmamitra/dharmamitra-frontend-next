import React from "react"
import { useTranslations } from "next-intl"
import { Box, Link, List, ListItem, ListItemText, Typography } from "@mui/material"

import { docsSiteUrl, linkAttrs } from "@/utils/constants"

const noticeListKeys = ["1", "2", "3", "4"] as const

export default function UsageDialogContent({ dense }: { dense?: boolean }) {
  const t = useTranslations("search")

  return (
    <Box>
      {/* Hack: hidden focusable element to receive initial focus instead of the link when Dialog is opened */}
      <div
        tabIndex={0}
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
      />

      <h2>{t("usageH2")}</h2>

      <Typography variant={dense ? "body2" : "body1"}>{t(`usageNoticeLong.p1`)}</Typography>
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
            <ListItemText
              primary={t.rich(`usageNoticeLong.ul.${key}`, {
                strong: (chunks) => <strong>{chunks}</strong>,
                i: (chunks) => <i>{chunks}</i>,
              })}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant={dense ? "body2" : "body1"}>
        {t.rich(`usageNoticeLong.p2`, {
          a: (chunks) => (
            <Link href={docsSiteUrl} {...linkAttrs}>
              {chunks}
            </Link>
          ),
        })}
      </Typography>
    </Box>
  )
}
