import * as React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import useMediaQuery from "@mui/material/useMediaQuery"

import { debounce } from "@/utils"
import { localStorageKeys } from "@/utils/constants"

import TranslationInputEncodingSelector from "../InputEncodingSelector"
import SearchInput from "./SearchInput"
import SearchKeyboardControls from "./SearchKeyboardControls"
import SearchOptions from "./SearchOptions"
import SearchResults from "./SearchResults"

type TranslationFeatureProps = {
  isSearchOptionsOpen: boolean
  setIsSearchOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const searchWrapperId = "search-input-wrapper"

export default function SearchFeature({
  isSearchOptionsOpen,
  setIsSearchOptionsOpen,
}: TranslationFeatureProps) {
  const t = useTranslations("search")
  const isSmallScreen = useMediaQuery("(max-width:750px)")

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
    const target = document.getElementById(searchWrapperId)
    if (!target) return

    const currentScrollY = window.scrollY
    const currentHeight = target.offsetHeight
    let direction = currentScrollY > lastScrollY.current ? "down" : "up"

    if (currentHeight > lastHeight.current) {
      direction = "up"
    }

    if (direction === "up") {
      target.setAttribute(
        "style",
        "position: sticky; box-shadow: 0 4px 1px -1px rgb(0 0 0 / 10%);",
      )
    } else if (direction === "down") {
      target.setAttribute("style", "position: static;")
    }

    if (currentScrollY <= 228) {
      target.setAttribute("style", "position: static;")
    }

    lastScrollY.current = currentScrollY
    lastHeight.current = currentHeight
  }, [lastScrollY, lastHeight])

  const debouncedHandleScroll = React.useRef(debounce(handleScroll, 30)).current

  React.useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll)
    return () => window.removeEventListener("scroll", debouncedHandleScroll)
  }, [debouncedHandleScroll])

  return (
    <>
      <Box
        id={searchWrapperId}
        sx={{
          bgcolor: "background.paper",
          py: 1,
          zIndex: 10,
          transition: "position 1s ease-in-out, box-shadow 0.3s ease-in-out",
          top: {
            xs: "78px",
            md: "96px",
          },
          borderRadius: "0 0 10px 10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              md: "row",
            },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: {
              xs: "flex-start",
              md: isSearchOptionsOpen ? "space-between" : "flex-end",
            },
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
            labelPlacement={isSmallScreen ? "end" : "start"}
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
