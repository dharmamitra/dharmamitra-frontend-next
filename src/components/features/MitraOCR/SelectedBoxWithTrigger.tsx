import * as React from "react"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import FileIcon from "@mui/icons-material/InsertDriveFile"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import { Box, IconButton, Typography } from "@mui/material"

import { ocrSelectionBoxId } from "./utils"

type SelectedFileProps = {
  file: File
  onClear: () => void
  onTrigger: () => void
  isTriggerDisabled?: boolean
}

export default function SelectedBoxWithTrigger({
  file,
  onClear,
  onTrigger,
  isTriggerDisabled,
}: SelectedFileProps) {
  return (
    <Box
      id={ocrSelectionBoxId}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FileIcon sx={{ fontSize: 28, color: "primary.main" }} />

          <Box display="grid" alignItems="center">
            <Typography variant="body2" lineHeight={1}>
              {file.name}
            </Typography>

            <Typography variant="caption" color="text.secondary" lineHeight={1}>
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <IconButton onClick={onClear} aria-label="Clear">
          <CancelOutlinedIcon color="action" />
        </IconButton>

        <IconButton
          onClick={onTrigger}
          aria-label="Start text extraction"
          disabled={isTriggerDisabled}
        >
          <PlayCircleIcon color="secondary" />
        </IconButton>
      </Box>
    </Box>
  )
}
