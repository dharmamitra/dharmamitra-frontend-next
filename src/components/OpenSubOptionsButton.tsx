// import { useTranslations } from "next-intl"

import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown"
import { IconButton, SxProps } from "@mui/material"

type Props = {
  isShown: boolean
  setShowSubOption: React.Dispatch<React.SetStateAction<boolean>>
  sx?: SxProps
}

export default function OpenSubOptionsButton({ isShown, setShowSubOption, sx }: Props) {
  if (!isShown) return null

  //   const t = useTranslations("search")

  return (
    <IconButton
      size="small"
      sx={sx}
      onClick={() => {
        setShowSubOption(true)
      }}
    >
      <ArrowCircleDownIcon />
    </IconButton>
  )
}
