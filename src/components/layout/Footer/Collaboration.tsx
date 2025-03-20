import Image from "next/image"
import { useTranslations } from "next-intl"
import { Box, Link, Typography } from "@mui/material"

import tsadraLogo from "@/assets/logos/tsadra.png"
import { linkAttrs } from "@/utils/constants"

const LocalizedCollaboration = () => {
  const t = useTranslations("footer")
  return (
    <>
      <Typography variant="body2">
        {t.rich("collaboration", {
          link: (chunks) => (
            <Link href="https://tsadra.org/" {...linkAttrs}>
              {chunks}
            </Link>
          ),
        })}
      </Typography>
    </>
  )
}

const FallbackCollaboration = () => {
  return (
    <>
      <Typography variant="body2">
        In collaboration with the{" "}
        <Link href="https://tsadra.org/" {...linkAttrs}>
          Tsadra Foundation
        </Link>
        .
      </Typography>
    </>
  )
}

export default function Collaboration({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link href="https://tsadra.org/" {...linkAttrs}>
        <Image
          src={tsadraLogo}
          alt="Tsadra Foundation"
          width={90}
          height={68}
        />
      </Link>
      {isLocalized ? <LocalizedCollaboration /> : <FallbackCollaboration />}
    </Box>
  )
}
