"use client"

import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"

import { DM_API, type TranslationRequestProps } from "@/api"
import { setRows } from "@/features/utils"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"

export default function TranslationBox({
  placeholder,
  className,
}: {
  placeholder: string
  className?: string
}) {
  const [isQueryEnabled, setIsQueryEnabled] = React.useState(false)

  const { input, handleInputChange } = useInputWithUrlParam("input_sentence")

  const params: TranslationRequestProps = {
    input_sentence: input,
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
        rows={setRows(input)}
        multiline
        value={input}
        onChange={handleInputChange}
        onKeyUp={(event) => {
          if (event.key === "Enter" && input.length > 0) {
            setIsQueryEnabled(true)
          }
        }}
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
        {isLoading ? (
          <Typography component="p" variant="h5" sx={{ mt: 6 }}>
            Loading...
          </Typography>
        ) : null}
        {isError ? (
          <Typography component="p" variant="h5" sx={{ mt: 6 }}>
            Error
          </Typography>
        ) : null}
        {data ? (
          <>
            <Typography component="h3" variant="h5" sx={{ mt: 6 }}>
              Results:
            </Typography>
            <Typography sx={{ mt: 2 }}>{data.map((part) => part)}</Typography>
          </>
        ) : null}
      </Box>
    </Box>
  )
}
