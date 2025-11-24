"use client"

import * as React from "react"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import Box from "@mui/material/Box"

const minDrawerWidth = 300
const maxDrawerWidth = 1200

const ResizeHandle = ({
  setDrawerWidth,
}: {
  setDrawerWidth: React.Dispatch<React.SetStateAction<number | string>>
}) => {
  const handleMouseDown = () => {
    const drawerContent = document.getElementById("tagging-drawer-content")
    if (drawerContent) drawerContent.style.userSelect = "none"

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = e.clientX - document.body.offsetLeft
      if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
        setDrawerWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      const drawerContent = document.getElementById("tagging-drawer-content")
      if (drawerContent) drawerContent.style.userSelect = "unset"
      document.removeEventListener("mouseup", handleMouseUp, true)
      document.removeEventListener("mousemove", handleMouseMove, true)
    }

    document.addEventListener("mouseup", handleMouseUp, true)
    document.addEventListener("mousemove", handleMouseMove, true)
  }

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

export default ResizeHandle
