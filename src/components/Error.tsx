import * as React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"

import error from "@/assets/error-red.svg"

export default function Error() {
  const t = useTranslations("generic")

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          py: 1,
          width: { xs: "80px", sm: "100px" },
        }}
      >
        <Image
          src={error}
          alt="Dharmamitra"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            opacity: 0.75,
          }}
          priority
        />
      </Box>
      <Typography
        component="p"
        variant="h6"
        mt={0}
        color="error"
        align="center"
      >
        {t.rich("error", {
          newline: (chunks) => (
            <span style={{ display: "block" }}>{chunks}</span>
          ),
        })}
      </Typography>
    </Box>
  )
}
