"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import { usePathname, useRouter } from "@/navigation"

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
      {...other}
    >
      {value === index && <Box sx={{ width: "100%", py: 3 }}>{children}</Box>}
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
  children,
  tabIndex,
  tabLabels,
}: {
  children: React.ReactNode
  tabIndex: number
  tabLabels: Record<number, string>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      router.push(
        pathname +
          "?" +
          createQueryString("view", newValue === 0 ? "search" : "translate"),
      )
    },
    [router, pathname, createQueryString],
  )

  return (
    <Box sx={{ width: "100%", py: 3 }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="navigation tabs"
        centered
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
      {children}
    </Box>
  )
}
