"use client"

import * as React from "react"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"

import ResizeHandle from "./ResizeHandle"
import TranslationTaggingOutput from "./TranslationTaggingOutput"

export const defaultSmDrawerWidth = "95%"
export const defaultLgDrawerWidth = 700

type TaggingDrawerProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  drawerWidth: number | string
  setDrawerWidth: React.Dispatch<React.SetStateAction<number | string>>
}

export default function TaggingDrawer({
  open,
  setOpen,
  drawerWidth,
  setDrawerWidth,
}: TaggingDrawerProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="persistent"
        open={open}
        onClose={() => setOpen((prev) => !prev)}
        PaperProps={{ style: { width: drawerWidth } }}
        hideBackdrop={true}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: (theme) => theme.custom.palette.panel,
            width: drawerWidth,
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            boxShadow: "1px 0px 4px 0px #0000001A",
          },
        }}
      >
        {/* asbsolute wrapper ensures resize handle grows with accordion expantion */}
        <Box
          id="tagging-drawer-content"
          sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
        >
          <ResizeHandle setDrawerWidth={setDrawerWidth} />

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "flex-end",
              position: "sticky",
              top: "12px",
            }}
          >
            <IconButton aria-label="close" sx={{ mx: 1 }}>
              <CloseIcon onClick={() => setOpen((prev) => !prev)} />
            </IconButton>
          </Stack>
          <Box
            sx={{
              py: 3,
              pl: 3,
              pr: 6,
            }}
          >
            <TranslationTaggingOutput />
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}
