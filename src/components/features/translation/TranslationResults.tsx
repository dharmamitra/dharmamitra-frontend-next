"use client"

import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DM_API, type TranslationRequestProps } from "@/api"
import { triggerTranslationQueryAtom } from "@/atoms"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import {
  apiParamsNames,
  InputEncoding,
  inputEncodings,
  TargetLanguage,
  targetLanguages,
} from "@/utils/api/params"

export default function TranslationResults() {
  const { input: inputSentence } = useInputWithUrlParam(
    apiParamsNames.translation.input_sentence,
  )
  const { input: inputEncoding } = useInputWithUrlParam(
    apiParamsNames.translation.input_encoding,
  )
  const { input: targetLang } = useInputWithUrlParam(
    apiParamsNames.translation.target_lang,
  )

  // TODO: Add typing to useInputWithUrlParam and remove casting
  const inputEncodingParam = (
    inputEncoding ? inputEncoding : inputEncodings.auto
  ) as InputEncoding
  const targetLangParam = (
    targetLang ? targetLang : targetLanguages[0]
  ) as TargetLanguage

  const [triggerTranslationQuery, setTriggerTranslationQuery] = useAtom(
    triggerTranslationQueryAtom,
  )

  const params: TranslationRequestProps = {
    input_sentence: inputSentence,
    input_encoding: inputEncodingParam,
    level_of_explanation: 0,
    target_lang: targetLangParam,
    model: "NO",
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: DM_API.translation.makeQueryKey(params),
    queryFn: () => DM_API.translation.call(params),
    enabled: triggerTranslationQuery,
  })

  if (!isLoading) {
    setTriggerTranslationQuery(false)
  }

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        position: "relative",
        backgroundColor: "grey.100",
        overflow: "clip",
        p: 2,
        borderBottomRightRadius: (theme) => theme.custom.shape.inputRadius,
      }}
      data-testid="translation-results"
    >
      {isLoading ? (
        <Typography
          component="p"
          variant="h5"
          data-testid="translation-loading"
        >
          Loading...
        </Typography>
      ) : null}
      {isError ? (
        <Typography component="p" variant="h5" data-testid="translation-error">
          Error
        </Typography>
      ) : null}
      {data ? (
        <Typography
          data-testid="request-translation"
          sx={{ fontSize: (theme) => theme.custom.typography.reader?.fontSize }}
        >
          {data.map((part) => part)}
        </Typography>
      ) : null}
    </Grid>
  )
}
