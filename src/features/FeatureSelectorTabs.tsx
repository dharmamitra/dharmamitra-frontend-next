"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"

import SearchBox from "@/features/search/SearchBox"
import TranslationBox from "@/features/translation/TranslationBox"
import useParams from "@/hooks/useParams"

import styles from "./FeatureSelectorTabs.module.css"

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
      {value === index && (
        <Box sx={{ width: "100%", height: "100%", py: 3 }}>{children}</Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `feature-selector-tab-${index}`,
    "aria-controls": `feature-selector-tabpanel-${index}`,
  }
}

export default function FeatureSelectorTabs({
  tabIndex,
  tabLabels,
  headings,
  placeholders,
}: {
  tabIndex: number
  tabLabels: Record<number, string>
  headings: Record<string, string>
  placeholders: Record<string, string>
}) {
  const { ref: scrollMarkerRef, inView: scrollMarkerInView } = useInView({
    rootMargin: "-60px 0px",
    initialInView: true,
  })

  const { createQueryString, updateParams } = useParams()

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      updateParams(
        createQueryString("view", newValue === 0 ? "search" : "translate"),
      )
    },
    [updateParams, createQueryString],
  )

  return (
    <Box sx={{ width: "100%", height: 1900, py: 3, position: "relative" }}>
      <div style={{ height: "1px", width: "1px" }} ref={scrollMarkerRef}></div>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="navigation tabs"
        centered
        className={scrollMarkerInView ? undefined : styles.stickyTabs}
      >
        <Tab
          icon={<ScreenSearchDesktopOutlinedIcon />}
          iconPosition="start"
          label={tabLabels[0]}
          {...a11yProps(0)}
        />
        <Tab
          icon={<TranslateOutlinedIcon />}
          iconPosition="start"
          label={tabLabels[1]}
          {...a11yProps(1)}
        />
      </Tabs>

      <Box sx={{ height: "100%" }}>
        <FeatureTabPanel value={tabIndex} index={0}>
          <Typography
            component="h2"
            variant="h4"
            align="center"
            className={scrollMarkerInView ? undefined : styles.hiddenHeading}
            sx={{ mt: 2, mb: 5 }}
          >
            {headings.search}
          </Typography>
          <SearchBox
            className={scrollMarkerInView ? undefined : styles.stickyInput}
            placeholder={placeholders.search!}
          />
        </FeatureTabPanel>

        <FeatureTabPanel value={tabIndex} index={1}>
          <Typography
            component="h2"
            variant="h4"
            align="center"
            className={scrollMarkerInView ? undefined : styles.hiddenHeading}
            sx={{ mt: 2, mb: 5 }}
          >
            {headings.translation}
          </Typography>

          <TranslationBox
            className={scrollMarkerInView ? undefined : styles.stickyInput}
            placeholder={placeholders.translation!}
          />
        </FeatureTabPanel>
      </Box>
    </Box>
  )
}
