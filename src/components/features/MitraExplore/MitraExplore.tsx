import * as React from "react"
import { useLocale } from "next-intl"
import Box from "@mui/material/Box"

import ResetOptionsButton from "../MitraSearch/controls/ResetOptionsButton"
import ShowOptionsSwitch from "../MitraSearch/controls/ShowOptionsSwitch"
import SubInputSearchControls from "../MitraSearch/controls/SubInputSearchControls"
import SearchExamples from "../MitraSearch/SearchExamples"
import SearchUsageDialog from "../MitraSearch/SearchUsageDialog"

import ExploreInput from "./ExploreInput"
import ExploreOutput from "./ExploreOutput"
import { createExploreRequestBody } from "./utils"

import InputEncodingSelector from "@/components/features/paramSettings/InputEncodingSelector"
import { CONTAINED_FEATURE_SX } from "@/components/features/utils"
import {
  useFilterSourceLanguageParam,
  useFilterTargetLanguageParam,
  useSearchInputParam,
  //   useSearchTargetParam,
  useSearchTypeParam,
  useSourceFiltersValue,
} from "@/hooks/params"
import { useCachedChat } from "@/hooks/useCachedChat"
import { createChatProps, localAPIEndpoints } from "@/utils/api/stream"
import { localStorageKeys } from "@/utils/constants"

type ExploreFeatureProps = {
  isSearchControlsOpen: boolean
  setIsSearchControlsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MitraExplore({
  isSearchControlsOpen,
  setIsSearchControlsOpen,
}: ExploreFeatureProps) {
  const [search_input, setSearchInputParam] = useSearchInputParam()
  //   const [search_target] = useSearchTargetParam()
  const { include_collections, include_categories, include_files } = useSourceFiltersValue()
  const [filter_source_language] = useFilterSourceLanguageParam()
  const [filter_target_language] = useFilterTargetLanguageParam()
  const [search_type] = useSearchTypeParam()
  const locale = useLocale()

  const chatPropsWithId = React.useMemo(() => {
    const requestBody = createExploreRequestBody({
      search_input,
      search_type,
      filter_source_language,
      filter_target_language,
      locale,
      source_filters: {
        include_collections,
        include_categories,
        include_files,
      },
    })

    const chatProps = createChatProps({
      localEndpoint: localAPIEndpoints["mitra-explore"],
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
    locale,
  ])
  const { status, sendMessage, stop, messages, error } = useCachedChat(chatPropsWithId)

  const outputBoxRef = React.useRef<HTMLDivElement>(null)

  const [completedQueryIds, setCompletedQueryIds] = React.useState<Set<string>>(new Set())

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
    <Box sx={CONTAINED_FEATURE_SX}>
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
        <ExploreInput
          queryId={chatPropsWithId.id}
          input={search_input}
          setInput={setSearchInputParam}
          completedQueryIds={completedQueryIds}
          setCompletedQueryIds={setCompletedQueryIds}
          isTriggerDisabled={false}
          sendMessage={sendMessage}
          stop={stop}
          status={status}
          messages={messages}
        />

        <SubInputSearchControls isOpen={isSearchControlsOpen} />

        <SearchExamples isShown={!isSearchControlsOpen} />
      </Box>

      <ExploreOutput
        ref={outputBoxRef}
        messages={messages}
        id={chatPropsWithId.id}
        status={status}
        error={error}
      />
    </Box>
  )
}
