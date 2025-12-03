"use client"

import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined"
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined"
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined"
import TranslateIcon from "@mui/icons-material/Translate"
import Box from "@mui/material/Box"
import List from "@mui/material/List"

import { MitraFeature } from "./constants"
import SidebarNavItem from "./SidebarNavItem"

type NavItemConfig = {
  route: MitraFeature
  icon: typeof TranslateIcon
  labelKey: MitraFeature
}

const navItems: NavItemConfig[] = [
  { route: "translate", icon: TranslateIcon, labelKey: "translate" },
  { route: "explore", icon: ExploreOutlinedIcon, labelKey: "explore" },
  { route: "db-search", icon: ManageSearchOutlinedIcon, labelKey: "db-search" },
  { route: "ocr", icon: DocumentScannerOutlinedIcon, labelKey: "ocr" },
]

type Props = {
  isExpanded: boolean
}

export default function SidebarNav({ isExpanded }: Props) {
  return (
    <List component="nav">
      <Box component="ul" sx={{ listStyle: "none", p: 0 }}>
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.route}
            route={item.route}
            icon={item.icon}
            labelKey={item.labelKey}
            isExpanded={isExpanded}
          />
        ))}
      </Box>
    </List>
  )
}
