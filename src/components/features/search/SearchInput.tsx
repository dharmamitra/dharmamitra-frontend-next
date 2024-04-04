import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useSetAtom } from "jotai"

import { triggerSearchQueryAtom } from "@/atoms"
import { setRows } from "@/features/utils"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames } from "@/utils/api/params"

export default function SearchBox({
  placeholder,
  className,
  isScrolling,
}: {
  placeholder: string
  className?: string
  isScrolling?: boolean
}) {
  const { input, handleInputChange } = useInputWithUrlParam(
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
        }}
        placeholder={placeholder}
        inputProps={{
          "aria-label": "search",
        }}
        value={input}
        rows={isScrolling ? 1 : setRows(input)}
        multiline
        onChange={handleInputChange}
        onKeyUp={(event) => {
          if (event.key === "Enter" && input.length > 0) {
            setTriggerSearchQuery(true)
          }
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setTriggerSearchQuery(true)
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  )
}
