import * as React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import { Breakpoint } from "@mui/material/styles"

import error from "@/assets/error-red.svg"

const DefaultMessage = () => {
  const t = useTranslations("generic")

  return t.rich("exception.default", {
    newline: (chunks) => <span style={{ display: "block" }}>{chunks}</span>,
  })
}

type Props = {
  imgWdiths?: Partial<Record<Breakpoint, string>>
  message?:
    | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | readonly React.ReactNode[]
}

export default function Error({ imgWdiths = { xs: "80px", sm: "100px" }, message }: Props) {
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
      <Typography component="div" variant="h6" mt={0} color="error" align="center">
        {message ?? <DefaultMessage />}
      </Typography>
    </Box>
  )
}
