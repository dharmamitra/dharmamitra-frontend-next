"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { useTranslations } from "next-intl"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import { tabsStyles } from "@/components/styled"
import SearchFeature from "@/features/search"
import TranslationFeature from "@/features/translation"
import useGlobalParams from "@/hooks/useGlobalParams"
import useParams from "@/hooks/useParams"
import { globalParamsNames } from "@/utils/api/global/params"
import { View } from "@/utils/api/global/types"
import { localStorageKeys } from "@/utils/constants"

import LoadingToolSelectorTabs from "./LoadingToolSelectorTabs"

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

export const minToolBoxHeight = "70vh"

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

const {
  local: { view: view_param_name },
} = globalParamsNames

type ViewIndex = 0 | 1
const viewToIndexMap: Record<View, ViewIndex> = {
  search: 0,
  translation: 1,
}
const indexToViewMap: Record<ViewIndex, View> = {
  0: "search",
  1: "translation",
}

export default function ToolSelectorTabs() {
  const t = useTranslations()

  const { view, setView } = useGlobalParams()
  const { getSearchParam } = useParams()

  const [tabIndex, setTabIndex] = React.useState(
    view in viewToIndexMap ? viewToIndexMap[view] : -1,
  )
  const [isSearchOptionsOpen, setIsSearchOptionsOpen] = React.useState(false)

  React.useEffect(() => {
    const initialViewParam = getSearchParam(view_param_name) as View
    const initialStoredView = localStorage.getItem(view_param_name) as View

    if (initialViewParam) {
      setTabIndex(viewToIndexMap[initialViewParam])
    } else if (initialStoredView) {
      setTabIndex(viewToIndexMap[initialStoredView])
      setView(initialStoredView)
    } else {
      setTabIndex(0)
      setView(indexToViewMap[0])
    }

    setIsSearchOptionsOpen(
      !!localStorage.getItem(localStorageKeys.showSearchOptions),
    )
  }, [getSearchParam, setTabIndex, setIsSearchOptionsOpen, setView])

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: ViewIndex) => {
      window.scrollTo(0, 0)
      setTabIndex(newValue)
      setView(indexToViewMap[newValue])
    },
    [setTabIndex, setView],
  )

  const { ref: scrollMarkerRef, inView: scrollMarkerInView } = useInView({
    rootMargin: view === "search" ? "200px 0px" : "400px 0px",
    initialInView: true,
  })

  if (tabIndex === -1) {
    return <LoadingToolSelectorTabs />
  }

  return (
    <>
      <Box>
        <Tabs
          value={tabIndex}
          aria-label="navigation tabs"
          centered
          onChange={handleTabChange}
          TabIndicatorProps={{
            sx: {
              display: "none",
            },
          }}
          sx={tabsStyles}
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
      </Box>

      <Box
        id="tool-box"
        sx={{
          width: "100%",
          minHeight: minToolBoxHeight,
          py: { md: 2 },
          position: "relative",
        }}
      >
        <div
          style={{ height: "1px", width: "1px" }}
          ref={scrollMarkerRef}
        ></div>

        <Box sx={{ height: "100%" }}>
          <FeatureTabPanel value={tabIndex} index={0}>
            <Box
              id="search-external-feature-wrapper"
              sx={{ maxWidth: "960px", mx: "auto", mt: { md: 6 } }}
            >
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

      <Box
        sx={{
          display: scrollMarkerInView ? "none" : "flex",
          position: { xs: "fixed", lg: "sticky" },
          bottom: "1.5rem",
          right: { xs: "1.5rem", lg: 0 },
          zIndex: 1000,
          justifyContent: "flex-end",
          transition: "display 1.5s ease-in-out",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <IconButton
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "auto",
            })
          }
          aria-label="go back to top"
          sx={{
            backgroundColor: "white",
            border: "2px solid",
            borderColor: "divider",
          }}
        >
          <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
        </IconButton>
      </Box>
    </>
  )
}
