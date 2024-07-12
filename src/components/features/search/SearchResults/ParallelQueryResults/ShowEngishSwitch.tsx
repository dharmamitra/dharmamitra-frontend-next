import React from "react"
import { useTranslations } from "next-intl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import { localStorageKeys } from "@/utils/constants"

const { showParallelTranslations: storageKey } = localStorageKeys

export const cssNames = {
  target: "parallel-translation",
  displayVar: `--${storageKey}`,
}

export default function ShowEngishSwitch() {
  const t = useTranslations("search")
  const [showEnglish, setShowEnglish] = React.useState(
    localStorage.getItem(storageKey) === "true",
  )

  React.useEffect(() => {
    const targetElements = document.querySelectorAll(
      `.${cssNames.target}`,
    ) as NodeListOf<HTMLElement>
    targetElements.forEach((target) =>
      target.style.setProperty(
        cssNames.displayVar,
        showEnglish ? "block" : "none",
      ),
    )
    localStorage.setItem(storageKey, showEnglish ? "true" : "false")
  }, [showEnglish])

  return (
    <FormControlLabel
      control={
        <Switch
          color="secondary"
          size="small"
          checked={Boolean(showEnglish)}
          onChange={() => setShowEnglish(!showEnglish)}
        />
      }
      label={t("parallelEnglishSwitch")}
      labelPlacement="start"
      sx={{
        mx: 0,
        ".MuiFormControlLabel-label": {
          fontSize: "1rem",
        },
      }}
    />
  )
}
