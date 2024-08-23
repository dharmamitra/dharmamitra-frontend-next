"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import { tabsStyles } from "@/components/styled"

import { a11yProps } from "./LazyToolSelectorTabs"
import LoadingBox from "./LoadingBox"

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
        sx={{
          ...tabsStyles,
          "& button.Mui-selected": {
            backgroundColor: "grey.200",
          },
        }}
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

      <LoadingBox />
    </>
  )
}
