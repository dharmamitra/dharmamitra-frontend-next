"use client"

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useSetAtom } from "jotai"

import { triggerTranslationQueryAtom } from "@/atoms"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import customTheming from "@/utils/theme/config"

export default function TranslationInput({
  placeholder,
}: {
  placeholder: string
}) {
  const { input, handleInputChange } = useInputWithUrlParam("input_sentence")
  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)

  const rows = 16

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        position: "relative",
        minHeight: `${rows * 2}rem`,
      }}
    >
      <OutlinedInput
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          overflow: "clip",
          borderTopRightRadius: "none",
          borderBottomRightRadius: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          borderRadius: customTheming.shape.inputRadius,
        }}
        placeholder={placeholder}
        inputProps={{
          "aria-label": "translate",
        }}
        rows={rows}
        multiline
        value={input}
        onChange={handleInputChange}
        onKeyUp={(event) => {
          if (event.key === "Enter" && input.length > 0) {
            setTriggerTranslationQuery(true)
          }
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <Button
          variant="text"
          endIcon={<KeyboardDoubleArrowRightIcon />}
          onClick={() => {
            setTriggerTranslationQuery(true)
          }}
        >
          Translate
        </Button>
      </Box>
    </Grid>
  )
}
