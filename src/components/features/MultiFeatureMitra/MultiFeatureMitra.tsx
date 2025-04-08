"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { useTranslations } from "next-intl"
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined"
import FormatShapesIcon from "@mui/icons-material/FormatShapes"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import useMediaQuery from "@mui/material/useMediaQuery"

import MitraOCR from "@/components/features/MitraOCR"
import MitraSearch from "@/components/features/MitraSearch"
import MitraTranslator from "@/components/features/MitraTranslator"
import { tabsStyles } from "@/components/styled-ssr-safe"
import { useViewTabParamWithLocalStorage } from "@/hooks/params"
import useAppConfig from "@/hooks/useAppConfig"
import { ViewIndex } from "@/utils/api/global/validators"

import FeatureTabPanel from "./FeatureTabPanel"
import ScrollToTopButton from "./ScrollToTopButton"

export const minToolBoxHeight = "70vh"

export function a11yProps(index: number) {
  return {
    id: `feature-selector-tab-${index}`,
    "aria-controls": `feature-selector-tabpanel-${index}`,
  }
}

export default function MultiFeatureMitra() {
  const t = useTranslations()
  const { hasSearch, hasOCR } = useAppConfig().featureFlags

  const isXsScreen = useMediaQuery("(max-width:480px)")

  const [viewTabIndex, setViewTabIndex] = useViewTabParamWithLocalStorage()

  const [isSearchControlsOpen, setIsSearchControlsOpen] = React.useState(true)

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: ViewIndex) => {
      setViewTabIndex(newValue)
    },
    [setViewTabIndex],
  )

  const { ref: scrollMarkerRef, inView: scrollMarkerInView } = useInView({
    rootMargin: viewTabIndex === 0 ? "200px 0px" : "400px 0px",
    initialInView: true,
  })

  return (
    <>
      <Box>
        <Tabs
          value={viewTabIndex}
          aria-label="navigation tabs"
          centered
          onChange={handleTabChange}
          slotProps={{
            indicator: {
              sx: {
                display: "none",
              },
            },
          }}
          sx={tabsStyles}
        >
          {hasSearch ? (
            <Tab
              icon={
                isXsScreen ? undefined : <ScreenSearchDesktopOutlinedIcon />
              }
              iconPosition="start"
              label={t("search.search")}
              {...a11yProps(0)}
            />
          ) : null}

          <Tab
            icon={isXsScreen ? undefined : <TranslateOutlinedIcon />}
            iconPosition="start"
            label={t("translation.translate")}
            {...a11yProps(1)}
          />

          {hasOCR ? (
            <Tab
              icon={isXsScreen ? undefined : <DocumentScannerOutlinedIcon />}
              iconPosition="start"
              label="OCR"
              {...a11yProps(2)}
            />
          ) : null}
        </Tabs>
      </Box>

      <Box
        id="features-box"
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
          {hasSearch ? (
            <FeatureTabPanel value={viewTabIndex} index={0}>
              <Box
                id="search-feature-wrapper"
                sx={{ maxWidth: "960px", mx: "auto", mt: { md: 6 } }}
              >
                <MitraSearch
                  isSearchControlsOpen={isSearchControlsOpen}
                  setIsSearchControlsOpen={setIsSearchControlsOpen}
                />
              </Box>
            </FeatureTabPanel>
          ) : null}

          <FeatureTabPanel value={viewTabIndex} index={hasSearch ? 1 : 0}>
            <Box id="translator-feature-wrapper" sx={{ mt: 6 }}>
              <MitraTranslator />
            </Box>
          </FeatureTabPanel>

          {hasOCR ? (
            <FeatureTabPanel value={viewTabIndex} index={hasSearch ? 2 : 1}>
              <Box
                id="ocr-feature-wrapper"
                sx={{ maxWidth: "960px", mx: "auto", mt: { md: 6 } }}
              >
                <MitraOCR />
              </Box>
            </FeatureTabPanel>
          ) : null}
        </Box>
      </Box>

      <ScrollToTopButton scrollMarkerInView={scrollMarkerInView} />
    </>
  )
}
