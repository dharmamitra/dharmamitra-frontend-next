"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { RadioGroup } from "@mui/material"

import useAppConfig from "@/hooks/useAppConfig"
import useInputWithLocalStorage from "@/hooks/useInputWithLocalStorage"
import { apiParamsNames, translationModels } from "@/utils/api/params"

import RadioOptionButtonGroup from "../common/RadioOptionButtonGroup"

export default function LazyModelSelector() {
  const t = useTranslations("translation")

  const { model } = useAppConfig().paramOptions

  const { input, handleInputChange, isHydrated } = useInputWithLocalStorage({
    paramName: apiParamsNames.translation.model,
    defaultValue: model,
  })

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(model)
    }
  }, [input, handleInputChange, model])

  return (
    <>
      <RadioGroup
        aria-label={t("modelLabel")}
        value={input ? input : model}
        onChange={(e) => handleInputChange(e.target.value)}
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          columnGap: 1,
        }}
        row
      >
        {translationModels.map((model) => (
          <RadioOptionButtonGroup
            key={model + "-model-option"}
            i18nKey="models"
            option={model}
            isSelected={isHydrated && input === model}
          />
        ))}
      </RadioGroup>
    </>
  )
}
