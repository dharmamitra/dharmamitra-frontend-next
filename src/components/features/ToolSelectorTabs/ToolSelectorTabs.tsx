"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { useTranslations } from "next-intl"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import SearchFeature from "@/features/search"
import TranslationFeature from "@/features/translation"
import { localStorageKeys } from "@/utils/constants"

import LoadingToolSelectorTabs from "./LoadingToolSelectorTabs"
import styles from "./ToolSelectorTabs.module.css"

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

export const minToolBoxHeight = "70vh"

export const tabsStyles = {
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
}

export function a11yProps(index: number) {
  return {
    id: `feature-selector-tab-${index}`,
    "aria-controls": `feature-selector-tabpanel-${index}`,
  }
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

export default function ToolSelectorTabs() {
  const [tabIndex, setTabIndex] = React.useState(-1)
  const [isSearchOptionsOpen, setIsSearchOptionsOpen] = React.useState(false)

  React.useEffect(() => {
    const storedTabIndex = localStorage.getItem(localStorageKeys.view)
    if (storedTabIndex !== null) {
      setTabIndex(Number(storedTabIndex))
    } else {
      setTabIndex(0)
    }

    setIsSearchOptionsOpen(
      !!localStorage.getItem(localStorageKeys.showSearchOptions),
    )
  }, [setTabIndex, setIsSearchOptionsOpen])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    window.scrollTo(0, 0)
    setTabIndex(newValue)
    localStorage.setItem(localStorageKeys.view, String(newValue))
  }

  const t = useTranslations()

  const { ref: scrollMarkerRef, inView: scrollMarkerInView } = useInView({
    rootMargin: "-60px 0px",
    initialInView: true,
  })

  if (tabIndex === -1) {
    return <LoadingToolSelectorTabs />
  }

  return (
    <>
      <Tabs
        value={tabIndex}
        aria-label="navigation tabs"
        centered
        onChange={handleTabChange}
        className={`${styles.stickyTabs}${!scrollMarkerInView ? ` ${styles.stickyTabsDesktop}` : ""}`}
        TabIndicatorProps={{
          sx: { display: "none" },
        }}
        sx={{
          ...tabsStyles,
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
      <Box
        sx={{
          width: "100%",
          minHeight: minToolBoxHeight,
          py: 3,
          position: "relative",
        }}
      >
        <div
          style={{ height: "1px", width: "1px" }}
          ref={scrollMarkerRef}
        ></div>

        <Box sx={{ height: "100%" }}>
          <FeatureTabPanel value={tabIndex} index={0}>
            <Box sx={{ maxWidth: "960px", mx: "auto", mt: { md: 6 } }}>
              <SearchFeature
                isSearchOptionsOpen={isSearchOptionsOpen}
                setIsSearchOptionsOpen={setIsSearchOptionsOpen}
              />
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
