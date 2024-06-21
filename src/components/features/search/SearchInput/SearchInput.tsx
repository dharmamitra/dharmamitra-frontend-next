import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useSetAtom } from "jotai"

import { triggerSearchQueryAtom } from "@/atoms"
import { setRows } from "@/features/utils"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames } from "@/utils/api/params"

import StartStopButton from "../SearchStartStopButton"

export default function SearchBox({
  className,
  isScrolling,
}: {
  className?: string
  isScrolling?: boolean
}) {
  const t = useTranslations("search")

  const { input, handleValueChange } = useInputWithUrlParam<string>(
    apiParamsNames.search.search_input,
  )

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
        value={input}
        rows={isScrolling ? 1 : setRows(input)}
        multiline
        onChange={handleValueChange}
        onKeyUp={(event) => {
          if (event.key === "Enter" && input.length > 0) {
            setTriggerSearchQuery(true)
          }
        }}
        endAdornment={<StartStopButton />}
      />
    </Box>
  )
}
