import * as React from "react"
import Box from "@mui/material/Box"

import ResetOptionsButton from "../MitraSearch/controls/ResetOptionsButton"
import ShowOptionsSwitch from "../MitraSearch/controls/ShowOptionsSwitch"
import SubInputSearchControls from "../MitraSearch/controls/SubInputSearchControls"
import SearchExamples from "../MitraSearch/SearchExamples"
import SearchInput from "../MitraSearch/SearchInput"
import SearchResults from "../MitraSearch/SearchResults"
import SearchUsageDialog from "../MitraSearch/SearchUsageDialog"
import { createSearchRequestBody } from "../MitraSearch/utils"

import InputEncodingSelector from "@/components/features/paramSettings/InputEncodingSelector"
import { createChatProps } from "@/components/features/utils"
import {
  useFilterSourceLanguageParam,
  useFilterTargetLanguageParam,
  useSearchInputParam,
  useSearchTypeParam,
  useSourceFiltersValue,
} from "@/hooks/params"
import { streamUtils } from "@/utils/api"
import { localStorageKeys } from "@/utils/constants"

type TranslationFeatureProps = {
  isSearchControlsOpen: boolean
  setIsSearchControlsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MitraSearch({
  isSearchControlsOpen,
  setIsSearchControlsOpen,
}: TranslationFeatureProps) {
  const [search_input] = useSearchInputParam()
  // const [search_target] = useSearchTargetParam()
  const { include_collections, include_categories, include_files } = useSourceFiltersValue()
  const [filter_source_language] = useFilterSourceLanguageParam()
  const [filter_target_language] = useFilterTargetLanguageParam()
  const [search_type] = useSearchTypeParam()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const chatPropsWithId = React.useMemo(() => {
    const requestBody = createSearchRequestBody({
      search_input,
      search_type,
      filter_source_language,
      filter_target_language,
      source_filters: {
        include_collections,
        include_categories,
        include_files,
      },
    })

    const chatProps = createChatProps({
      localEndpoint: streamUtils.localAPIEndpoints["mitra-explore"],
      requestBody,
    })

    return { ...chatProps, id: JSON.stringify(requestBody) }
  }, [
    search_input,
    search_type,
    filter_source_language,
    filter_target_language,
    include_collections,
    include_categories,
    include_files,
  ])

  const handleToggleShowOptions = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsSearchControlsOpen(event.target.checked)

      if (event.target.checked) {
        localStorage.setItem(localStorageKeys.showSearchControls, String(event.target.checked))
      } else {
        localStorage.removeItem(localStorageKeys.showSearchControls)
      }
    },
    [setIsSearchControlsOpen],
  )

  return (
    <>
      <SearchUsageDialog />

      <Box
        id="search-input-wrapper"
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
              md: isSearchControlsOpen ? "space-between" : "flex-end",
            },
            flexWrap: "wrap",
            minHeight: "60px",
          }}
        >
          <InputEncodingSelector isRendered={isSearchControlsOpen} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShowOptionsSwitch
              isSearchControlsOpen={isSearchControlsOpen}
              handleToggleShowOptions={handleToggleShowOptions}
            />

            <ResetOptionsButton />
          </Box>
        </Box>
        <SearchInput />

        <SubInputSearchControls isOpen={isSearchControlsOpen} />

        <SearchExamples isShown={!isSearchControlsOpen} />
      </Box>

      <SearchResults />
    </>
  )
}
