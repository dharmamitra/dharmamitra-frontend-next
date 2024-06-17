"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { useTranslations } from "next-intl"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import SearchInput from "@/features/search/SearchInput"
import SearchResults from "@/features/search/SearchResults"
import TranslationFeature from "@/features/translation"

import styles from "./ToolSelectorTabs.module.css"

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

export function FeatureTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`feature-selector-tabpanel-${index}`}
      aria-labelledby={`feature-selector-tab-${index}`}
      style={{ height: "100%" }}
      {...other}
    >
      {value === index ? (
        <Box sx={{ width: "100%", height: "100%", py: 3 }}>{children}</Box>
      ) : null}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `feature-selector-tab-${index}`,
    "aria-controls": `feature-selector-tabpanel-${index}`,
  }
}

export default function ToolSelectorTabs() {
  // TODO: get from localStorage
  const [tabIndex, setTabIndex] = React.useState(1)

  const t = useTranslations()

  const { ref: scrollMarkerRef, inView: scrollMarkerInView } = useInView({
    rootMargin: "-60px 0px",
    initialInView: true,
  })

  return (
    <>
      <Tabs
        value={tabIndex}
        aria-label="navigation tabs"
        centered
        onChange={(event, newValue) => setTabIndex(newValue)}
        className={`${styles.stickyTabs}${!scrollMarkerInView ? ` ${styles.stickyTabsDesktop}` : ""}`}
        TabIndicatorProps={{
          sx: { display: "none" },
        }}
        sx={{
          borderRadius: "50px",
          backgroundColor: "#eeeeee",
          "& button": {
            minHeight: "48px",
            maxHeight: "48px",
            margin: "8px",
            borderRadius: "50px",
            border: "3px solid transparent",
            transition:
              "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
          },

          "& button.Mui-selected": {
            backgroundColor: "#fff",
            boxShadow: "0px 4px 4px 0px #0000001C",
            transition:
              "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
          },
        }}
      >
        <Tab
          icon={<ScreenSearchDesktopOutlinedIcon />}
          iconPosition="start"
          label={t("search.search")}
          {...a11yProps(0)}
        />

        <Tab
          icon={<TranslateOutlinedIcon />}
          iconPosition="start"
          label={t("translation.translate")}
          {...a11yProps(1)}
        />
      </Tabs>
      <Box sx={{ width: "100%", py: 3, position: "relative" }}>
        <div
          style={{ height: "1px", width: "1px" }}
          ref={scrollMarkerRef}
        ></div>

        <Box sx={{ height: "100%" }}>
          <FeatureTabPanel value={tabIndex} index={0}>
            <Box sx={{ maxWidth: "960px", mx: "auto", mt: 6 }}>
              <SearchInput
                className={scrollMarkerInView ? undefined : styles.stickyInput}
                placeholder="TODO: placeholder"
                isScrolling={!scrollMarkerInView}
              />

              <SearchResults />
            </Box>
          </FeatureTabPanel>

          <FeatureTabPanel value={tabIndex} index={1}>
            <Box sx={{ mt: 6 }}>
              <TranslationFeature />
            </Box>
          </FeatureTabPanel>
        </Box>
      </Box>
    </>
  )
}
