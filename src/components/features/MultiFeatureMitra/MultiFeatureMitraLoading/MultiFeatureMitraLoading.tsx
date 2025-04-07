"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import { tabsStyles } from "@/components/styled-ssr-safe"

import LoadingBox from "./LoadingBox"

export default function MultiFeatureMitraLoading() {
  const t = useTranslations()
  return (
    <>
      <Tabs
        value={0}
        aria-label="loading navigation tabs"
        centered
        slotProps={{
          indicator: {
            sx: {
              display: "none",
            },
          },
        }}
        sx={{
          ...tabsStyles,
          "& button.Mui-selected": {
            backgroundColor: "grey.200",
          },
        }}
      >
        {/* Tabs are duplicated to prevent post-load layout shift on given screen size. Under SM no icons are displayed. Duplicates are hidden by screen size and are necessary, because `Tabs` expects only `Tab` as children  */}
        <Tab
          value={0}
          sx={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
          iconPosition="start"
          label={t("search.search")}
          disabled
        />
        <Tab
          sx={{
            display: { sm: "none" },
          }}
          iconPosition="start"
          label={t("search.search")}
          disabled
        />
        <Tab
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
          icon={<ScreenSearchDesktopOutlinedIcon />}
          iconPosition="start"
          label={t("search.search")}
          disabled
        />

        <Tab
          sx={{
            display: { sm: "none" },
          }}
          iconPosition="start"
          label={t("translation.translate")}
          disabled
        />
        <Tab
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
          icon={<TranslateOutlinedIcon />}
          iconPosition="start"
          label={t("translation.translate")}
          disabled
        />

        <Tab
          sx={{
            display: { sm: "none" },
          }}
          iconPosition="start"
          label="OCR"
          disabled
        />
        <Tab
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
          icon={<DocumentScannerOutlinedIcon />}
          iconPosition="start"
          label="OCR"
          disabled
        />
      </Tabs>

      <LoadingBox />
    </>
  )
}
