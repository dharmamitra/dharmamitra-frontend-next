import React from "react"
import { FormControl, Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

import customTheming from "@/utils/theme/config"

export default function SettingBlock({
  label,
  children,
  placement,
  testId,
}: {
  label: string
  children: React.ReactNode
  placement: "start" | "end"
  testId?: string
}) {
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        position: "relative",
        display: "flex",
        height: { xs: placement === "start" ? 86 : 76, md: 64 },
        pt: { xs: 1, md: 0 },
        px: 2,
        pb: { xs: placement === "start" ? 3 : 0, md: 0 },
        alignItems: { xs: "start", md: "flex-end" },
        transition: "opacity 1s ease-out",
        borderTopLeftRadius: {
          xs: customTheming.shape.inputRadius,
          md: placement === "start" ? customTheming.shape.inputRadius : 0,
        },
        borderTopRightRadius: {
          xs: customTheming.shape.inputRadius,
          md: placement !== "start" ? customTheming.shape.inputRadius : 0,
        },
        borderLeft: {
          md: placement === "end" ? `1px solid ${grey[300]}` : "none",
        },
        borderBottom: `1px solid`,
        borderColor: "divider",
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "-14px",
          left: "6px",
          px: 1,
          paddingBlock: "1px",
          color: "text.secondary",
          backgroundColor: "background.default",
          fontSize: "14px !important",
          borderRadius: "50px",
        }}
      >
        {label}
      </Typography>
      <FormControl
        data-testid={testId}
        component="fieldset"
        sx={{
          flexDirection: "row",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {children}
      </FormControl>
    </Grid>
  )
}
