import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"

import useSearchCommonParams from "@/hooks/useSearchCommonParams"

import StartStopButton from "../SearchStartStopButton"

export default function SearchBox({
  className,
  // isScrolling,
}: {
  className?: string
  isScrolling?: boolean
}) {
  const t = useTranslations("search")

  const { searchInput, updateSearchInput } = useSearchCommonParams()

  return (
    <Box className={className}>
      <OutlinedInput
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          overflow: "clip",
          py: 1.2,
        }}
        placeholder={t("placeholder")}
        inputProps={{
          "aria-label": "search",
        }}
        value={searchInput}
        multiline
        onChange={updateSearchInput}
        endAdornment={<StartStopButton />}
      />
    </Box>
  )
}
