"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import LoadingBox from "@/components/LoadingBox"

import { a11yProps, minToolBoxHeight, tabsStyles } from "./ToolSelectorTabs"

export default function LoadingToolSelectorTabs() {
  const t = useTranslations()
  return (
    <>
      <Tabs
        value={0}
        aria-label="navigation tabs"
        centered
        TabIndicatorProps={{
          sx: { display: "none" },
        }}
        sx={tabsStyles}
      >
        <Tab
          icon={<ScreenSearchDesktopOutlinedIcon />}
          iconPosition="start"
          label={t("search.search")}
          {...a11yProps(0)}
          disabled
        />

        <Tab
          icon={<TranslateOutlinedIcon />}
          iconPosition="start"
          label={t("translation.translate")}
          {...a11yProps(1)}
          disabled
        />
      </Tabs>
      <Box
        sx={{
          width: "100%",
          minHeight: minToolBoxHeight,
          py: 11,
          position: "relative",
        }}
      >
        <Box sx={{ maxWidth: "960px", mx: "auto", mt: 9 }}>
          <LoadingBox />
        </Box>
      </Box>
    </>
  )
}
