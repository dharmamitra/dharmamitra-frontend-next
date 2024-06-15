"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import CloseIcon from "@mui/icons-material/Close"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"

import useTaggingData from "@/hooks/useTaggingData"

import styles from "./LazyTranslationTaggingDrawer.module.css"
import TranslationTaggingOutput from "./TranslationTaggingOutput"

export const defaultDrawerWidth = 700
const minDrawerWidth = 300
const maxDrawerWidth = 1200

const ResizeHandle = ({
  setDrawerWidth,
}: {
  setDrawerWidth: React.Dispatch<React.SetStateAction<number>>
}) => {
  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const newWidth = e.clientX - document.body.offsetLeft
      if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
        setDrawerWidth(newWidth)
      }
    },
    [setDrawerWidth],
  )

  const handleMouseUp = React.useCallback(() => {
    const drawerContent = document.getElementById("tagging-drawer-content")
    if (drawerContent) drawerContent.style.userSelect = "unset"
    document.removeEventListener("mouseup", handleMouseUp, true)
    document.removeEventListener("mousemove", handleMouseMove, true)
  }, [handleMouseMove])

  const handleMouseDown = React.useCallback(() => {
    const drawerContent = document.getElementById("tagging-drawer-content")
    if (drawerContent) drawerContent.style.userSelect = "none"
    document.addEventListener("mouseup", handleMouseUp, true)
    document.addEventListener("mousemove", handleMouseMove, true)
  }, [handleMouseMove, handleMouseUp])

  return (
    <>
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          width: "16px",
          minHeight: "100vh",
          cursor: "ew-resize",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: "50%",
            transform: "translateY(100%)",
            marginLeft: "-12px",
            zIndex: 999,
          }}
        >
          <DragHandleIcon
            sx={{
              transform: "rotate(90deg)",
              cursor: "ew-resize",
              color: "grey.400",
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default function LazyTranslationTaggingDrawer() {
  const t = useTranslations("translation")

  const { data, isValidQuery } = useTaggingData()

  const [open, setOpen] = React.useState(false)

  const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth)

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    },
    [open],
  )

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  return (
    <>
      {isValidQuery || data?.sentences ? (
        <Button
          variant="outlined"
          onClick={() => setOpen((prev) => !prev)}
          color="secondary"
          aria-label={t("tagging.ariaLabel")}
          className={styles.button}
        >
          {t("tagging.label")}
        </Button>
      ) : null}
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
    </>
  )
}
