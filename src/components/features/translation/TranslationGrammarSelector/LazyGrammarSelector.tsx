"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import Switch from "@mui/material/Switch"

import useAppConfig from "@/hooks/useAppConfig"
import useInputWithLocalStorage from "@/hooks/useInputWithLocalStorage"
import { apiParamsNames } from "@/utils/api/params"

export default function LazyGrammarSelector() {
  const t = useTranslations("translation")

  const searchParams = useSearchParams()
  const targetLanguage = searchParams.get(
    apiParamsNames.translation.target_lang,
  )

  const { doGrammarExplanation } = useAppConfig().paramOptions

  const defaultValue = JSON.stringify(doGrammarExplanation)

  const { input, handleInputChange } = useInputWithLocalStorage({
    paramName: apiParamsNames.translation.do_grammar_explanation,
    defaultValue,
  })

  const [checked, setChecked] = React.useState(input === "true")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    handleInputChange(JSON.stringify(event.target.checked))
  }

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(defaultValue)
    }
  }, [input, handleInputChange, doGrammarExplanation])

  return (
    <Switch
      checked={checked}
      onChange={(e) => handleChange(e)}
      inputProps={{ "aria-label": t("grammarLabel") }}
      color="secondary"
      disabled={targetLanguage !== "sanskrit-knn"}
    />
  )
}
