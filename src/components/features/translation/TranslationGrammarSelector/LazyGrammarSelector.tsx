"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { RadioGroup, Typography } from "@mui/material"
import Box from "@mui/material/Box"

import useAppConfig from "@/hooks/useAppConfig"
import useInputWithLocalStorage from "@/hooks/useInputWithLocalStorage"
import { apiParamsNames } from "@/utils/api/params"

import RadioOptionButtonGroup from "../common/RadioOptionButtonGroup"

export default function LazyModelSelector() {
  const t = useTranslations("translation")

  const searchParams = useSearchParams()
  const targetLanguage = searchParams.get(
    apiParamsNames.translation.target_lang,
  )

  const { doGrammarExplanation } = useAppConfig().paramOptions

  const defaultValue = doGrammarExplanation ? "on" : "off"

  const { input, handleInputChange, isHydrated } = useInputWithLocalStorage({
    paramName: apiParamsNames.translation.do_grammar_explanation,
    defaultValue,
  })

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(defaultValue)
    }
  }, [input, handleInputChange, defaultValue])

  if (targetLanguage !== "sanskrit-knn") return null

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        height: "min-content",
        gap: 1,
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "14px !important",
          mb: 0.5,
          width: "max-content",
        }}
      >
        {t("grammarLabel")}:
      </Typography>
      <RadioGroup
        aria-label={t("modelLabel")}
        value={input ? input : defaultValue}
        onChange={(e) => handleInputChange(e.target.value)}
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 1,
        }}
        row
      >
        {["off", "on"].map((value) => (
          <RadioOptionButtonGroup
            key={value + "-grammar-option"}
            i18nKey="grammar"
            option={value}
            isSelected={isHydrated && input === value}
          />
        ))}
      </RadioGroup>
    </Box>
  )
}
