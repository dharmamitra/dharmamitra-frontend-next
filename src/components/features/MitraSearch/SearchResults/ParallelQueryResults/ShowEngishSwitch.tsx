import React from "react"
import { useTranslations } from "next-intl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import { localStorageKeys } from "@/utils/constants"
import { tryCatch } from "@/utils/try-catch"

const { showParallelTranslations: storageKey } = localStorageKeys

export const cssRenderProps = {
  target: "parallel-translation",
  displayVar: `--${storageKey}`,
}

const getInitialShowEnglishValue = () => {
  const item = localStorage.getItem(storageKey)
  return item === "true"
}

export default function ShowEngishSwitch() {
  const t = useTranslations("search")
  const [showEnglish, setShowEnglish] = React.useState(
    getInitialShowEnglishValue(),
  )

  const isMounted = React.useRef(true)

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  React.useEffect(() => {
    if (!isMounted.current) return

    const updateDOMAndLocalStorage = () => {
      const selector = `.${cssRenderProps?.target}`

      if (selector.trim().length < 2) {
        throw new Error("Invalid target selector.")
      }
      const targetElements = document.querySelectorAll(
        selector,
      ) as NodeListOf<HTMLElement>

      targetElements.forEach((target) => {
        target.style.setProperty(
          cssRenderProps.displayVar,
          showEnglish ? "block" : "none",
        )
      })
      localStorage.setItem(storageKey, showEnglish.toString())
    }

    const operationName = "ShowEngishSwitch.updateDOMAndLocalStorage"
    const result = tryCatch(updateDOMAndLocalStorage, operationName)

    if (result.error && isMounted.current) {
      // eslint-disable-next-line no-console
      console.error(`${operationName} failed:`, result.error.message)
    }
  }, [showEnglish])

  return (
    <FormControlLabel
      control={
        <Switch
          color="secondary"
          size="small"
          checked={showEnglish}
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
