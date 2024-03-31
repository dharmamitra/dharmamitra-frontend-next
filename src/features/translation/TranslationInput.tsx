import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useSetAtom } from "jotai"

import { triggerTranslationQueryAtom } from "@/atoms"
import { setRows } from "@/features/utils"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"

export default function TranslationInput({
  placeholder,
  className,
  isScrolling,
}: {
  placeholder: string
  className?: string
  isScrolling?: boolean
}) {
  const { input, handleInputChange } = useInputWithUrlParam("input_sentence")
  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)

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
          "aria-label": "translate",
        }}
        rows={isScrolling ? 1 : setRows(input)}
        multiline
        value={input}
        onChange={handleInputChange}
        onKeyUp={(event) => {
          if (event.key === "Enter" && input.length > 0) {
            setTriggerTranslationQuery(true)
          }
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setTriggerTranslationQuery(true)
          }}
        >
          Translate
        </Button>
      </Box>
    </Box>
  )
}
