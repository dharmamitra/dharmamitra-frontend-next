import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Box, Typography } from "@mui/material"

import Error from "@/components/Error"
import PageShell from "@/components/layout/PageShell"
import LocalLink from "@/components/LocalLink"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "oh no, too bad!",
  }
}

export default function NotFoundPage() {

  return (
    <html lang="en">
      <body>
        {"Oh no, too bad!"}
        {"Humph!"}
      </body>
    </html>
  )
}
