import * as React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import { localStorageKeys } from "@/utils/constants"

import TranslationInputEncodingSelector from "../InputEncodingSelector"
// import useAppConfig from "@/hooks/useAppConfig"
import SearchInput from "./SearchInput"
import SearchKeyboardControls from "./SearchKeyboardControls"
import SearchOptions from "./SearchOptions"
import SearchResults from "./SearchResults"

type TranslationFeatureProps = {
  isSearchOptionsOpen: boolean
  setIsSearchOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchFeature({
  isSearchOptionsOpen,
  setIsSearchOptionsOpen,
}: TranslationFeatureProps) {
  const t = useTranslations("search")
  // const { translateExtendedOptions } = useAppConfig().featureFlags

  const handleToggleShowOptions = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsSearchOptionsOpen(event.target.checked)

      if (event.target.checked) {
        localStorage.setItem(
          localStorageKeys.showSearchOptions,
          String(event.target.checked),
        )
      } else {
        localStorage.removeItem(localStorageKeys.showSearchOptions)
      }
    },
    [setIsSearchOptionsOpen],
  )

  const lastScrollY = React.useRef(0)
  const lastHeight = React.useRef(0)

  const handleScroll = React.useCallback(() => {
    const target = document.getElementById("search-input-wrapper")
    if (!target) return

    const currentScrollY = window.scrollY
    const currentHeight = target.offsetHeight
    let direction = currentScrollY > lastScrollY.current ? "down" : "up"

    if (currentHeight > lastHeight.current) {
      direction = "up"
    }

    if (direction === "up") {
      target.setAttribute("style", "position: sticky;")
    } else if (direction === "down") {
      target.setAttribute("style", "position: static;")
    }

    lastScrollY.current = currentScrollY
    lastHeight.current = currentHeight
  }, [lastScrollY, lastHeight])

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])
  return (
    <>
      <Box
        id="search-input-wrapper"
        sx={{
          bgcolor: "background.paper",
          py: 3,
          zIndex: 10,
          transition: "position 1s ease-in-out",
          top: {
            xs: "148px",
            md: "96px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isSearchOptionsOpen ? "space-between" : "flex-end",
            flexWrap: "wrap",
            minHeight: "60px",
          }}
        >
          <TranslationInputEncodingSelector isOpen={isSearchOptionsOpen} />

          <FormControlLabel
            control={
              <Switch
                checked={isSearchOptionsOpen}
                onChange={handleToggleShowOptions}
              />
            }
            label={t("optionsSwitchLabel")}
            labelPlacement="start"
          />
        </Box>
        <SearchInput />

        <SearchOptions isOpen={isSearchOptionsOpen} />
      </Box>

      <SearchResults />

      <SearchKeyboardControls />
    </>
  )
}
