"use client"

import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"

import { DM_API, type TranslationRequestProps } from "@/api"

export default function TranslationBox({
  placeholder,
}: {
  placeholder: string
}) {
  const [isQueryEnabled, setIsQueryEnabled] = React.useState(false)

  const inputSentence =
    "Kacci pana vo, anuruddhā, samaggā sammodamānā avivadamānā khīrodakībhūtā aññamaññaṁ piyacakkhūhi sampassantā viharathā”ti"

  const params: TranslationRequestProps = {
    input_sentence: inputSentence,
    input_encoding: "auto",
    level_of_explanation: 0,
    target_lang: "english",
    model: "NO",
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: DM_API.translation.makeQueryKey(params),
    queryFn: () => DM_API.translation.call(params),
    enabled: isQueryEnabled,
  })

  return (
    <Box>
      <OutlinedInput
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
        }}
        placeholder={placeholder}
        inputProps={{
          "aria-label": "translate",
        }}
        rows={1}
        multiline
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setIsQueryEnabled(true)
          }}
        >
          Translate
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography>Error</Typography>}
        {JSON.stringify(data as string)}
      </Box>
    </Box>
  )
}
