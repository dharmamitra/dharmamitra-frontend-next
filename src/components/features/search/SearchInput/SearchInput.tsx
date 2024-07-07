import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useSetAtom } from "jotai"

import { triggerSearchQueryAtom } from "@/atoms"
import { setRows } from "@/features/utils"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { searchParamsNames } from "@/utils/api/search/params"
import useSearchCommonParams from "@/hooks/useSearchCommonParams"

import StartStopButton from "../SearchStartStopButton"

export default function SearchBox({
  className,
  isScrolling,
}: {
  className?: string
  isScrolling?: boolean
}) {
  const t = useTranslations("search")

  const { searchInput, updateSearchInput } = useSearchCommonParams()

  const setTriggerSearchQuery = useSetAtom(triggerSearchQueryAtom)

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
        rows={isScrolling ? 1 : setRows(searchInput ?? "")}
        multiline
        onChange={updateSearchInput}
        onKeyUp={(event) => {
          if (event.key === "Enter" && searchInput && searchInput.length > 0) {
            setTriggerSearchQuery(true)
          }
        }}
        endAdornment={<StartStopButton />}
      />
    </Box>
  )
}
