"use client"

import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"

import { DM_API, type TranslationRequestProps } from "@/api"
import useParams from "@/hooks/useParams"

export default function TranslationBox({
  placeholder,
  className,
}: {
  placeholder: string
  className?: string
}) {
  const [isQueryEnabled, setIsQueryEnabled] = React.useState(false)

  const { getSearchParam, createQueryString, updateParams } = useParams()
  const [inputSentence, setInputSentence] = React.useState<string>(
    getSearchParam("input_sentence") ?? "",
  )

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value
      setInputSentence(newValue)
      updateParams(createQueryString("input_sentence", newValue))
    },
    [updateParams, createQueryString],
  )

  const params: TranslationRequestProps = {
    input_sentence: inputSentence,
    input_encoding: "auto",
    level_of_explanation: 0,
    target_lang: "english",
    model: "NO",
  }

  // OPTION 1: AWAIT WHOLE RESPONSE
  const { data, isLoading, isError } = useQuery({
    queryKey: DM_API.translation.makeQueryKey(params),
    queryFn: () => DM_API.translation.call(params),
    enabled: isQueryEnabled,
  })

  // OPTION 2: IMMEDIATE RESPONSE
  // const [eventMsgs, setEventMsgs] = React.useState<string[]>([])

  // React.useEffect(() => {
  //   if (!isQueryEnabled) {
  //     return
  //   }

  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/translation/`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(params),
  //       },
  //     )

  //     const reader = response.body?.getReader()
  //     const decoder = new TextDecoder("utf-8")

  //     while (true) {
  //       const { value, done } = (await reader?.read()) ?? {}
  //       if (done) break
  //       setEventMsgs((prev) => [...prev, extractContent(decoder.decode(value))])
  //     }
  //   }

  //   fetchData()
  //   setIsQueryEnabled(false)
  // }, [isQueryEnabled])

  return (
    <Box className={className}>
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
        value={inputSentence}
        onChange={handleInputChange}
        onKeyUp={(event) => {
          if (event.key === "Enter" && inputSentence.length > 0) {
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
        {isLoading ? <Typography>Loading...</Typography> : null}
        {isError ? <Typography>Error</Typography> : null}
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
