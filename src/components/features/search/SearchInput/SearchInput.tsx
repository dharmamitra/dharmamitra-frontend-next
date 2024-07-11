import * as React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"

import ClearButton from "@/components/ClearButton"
import useSearchCommonParams from "@/hooks/useSearchCommonParams"

import StartStopButton from "../SearchStartStopButton"

export default function SearchInput({ className }: { className?: string }) {
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
        type="search"
        onChange={updateSearchInput}
        endAdornment={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <StartStopButton />

            <ClearButton
              value={searchInput}
              handleValueChange={updateSearchInput}
            />
          </Box>
        }
      />
    </Box>
  )
}
