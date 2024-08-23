import * as React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import { Breakpoint } from "@mui/material/styles"

import error from "@/assets/error-red.svg"

type Props = {
  imgWdiths?: Partial<Record<Breakpoint, string>>
  message?:
    | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNodeArray
}

export default function Error({
  imgWdiths = { xs: "80px", sm: "100px" },
  message,
}: Props) {
  const t = useTranslations("generic")

  const defaultMessage = t.rich("exception.default", {
    newline: (chunks) => <span style={{ display: "block" }}>{chunks}</span>,
  })

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
          width: imgWdiths,
        }}
      >
        <Image
          src={error}
          alt="Error"
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
        {message ?? defaultMessage}
      </Typography>
    </Box>
  )
}
