import React, { memo, useState } from "react"
import useDimensions from "react-cool-dimensions"
import { useTranslations } from "next-intl"
import SearchIcon from "@mui/icons-material/Search"
import { Box, FormControl, InputAdornment, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useAtomValue, useSetAtom } from "jotai"

import { DMFetchApi } from "@/api"
import {
  activeDbSourceTreeAtom,
  activeDbSourceTreeBreadcrumbsAtom,
} from "@/atoms"
import {
  DbSourceFilterSelectorTreeProps,
  DbSourceTreeNode,
} from "@/features/paramSettings/DbSourceFilter/types"

import { DbSourceFilterSelectorTree } from "./treeComponents/DbSourceFilterSelectorTree"
import { LoadingTree } from "./treeComponents/LoadingTree"
import { TreeException } from "./treeComponents/TreeException"
import { TreeNavigation } from "./TreeNavigation"

type SearchableDbSourceMenuBaseProps = {
  parentHeight: number
  parentWidth: number
  padding?: number
}

type SearchableDbSourceMenuProps = SearchableDbSourceMenuBaseProps &
  DbSourceFilterSelectorTreeProps

export const SearchableDbSourceMenu = memo<SearchableDbSourceMenuProps>(
  function SearchableDbSourceMenu({
    parentHeight,
    parentWidth,
    padding = 2,
    sourceLanguage,
    filterName,
    selectionIds,
  }) {
    const [searchTerm, setSearchTerm] = useState("")
    const { observe, height: inputHeight } = useDimensions()

    const activeTree = useAtomValue(activeDbSourceTreeAtom)
    const setBreadcrumbs = useSetAtom(activeDbSourceTreeBreadcrumbsAtom)

    const handleSearchChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSearchTerm(value)

        if (value) {
          activeTree?.setSelection({
            ids: null,
            anchor: null,
            mostRecent: activeTree.mostRecentNode,
          })
          setBreadcrumbs([])
        }
      },
      [setSearchTerm, setBreadcrumbs, activeTree],
    )

    const t = useTranslations()

    const { data, isLoading, isError, error } = useQuery<DbSourceTreeNode[]>({
      queryKey: DMFetchApi.dbSourceMenuData.makeQueryKey(sourceLanguage),
      queryFn: () =>
        DMFetchApi.dbSourceMenuData.call({ language: sourceLanguage }),
    })

    if (isLoading) {
      return <LoadingTree padding={padding} />
    }

    if (isError || !data) {
      return (
        <TreeException
          padding={padding}
          message={error ? error.message : t("generic.noResult")}
        />
      )
    }

    return (
      <>
        <Box ref={observe} sx={{ p: padding, pb: 0 }}>
          {/* Search input */}
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearchChange}
            />
          </FormControl>

          <TreeNavigation />
        </Box>

        {/* Tree view - text browser */}
        <Box sx={{ pl: padding }}>
          <DbSourceFilterSelectorTree
            data={data}
            height={parentHeight - inputHeight}
            width={parentWidth}
            searchTerm={searchTerm}
            filterName={filterName}
            selectionIds={selectionIds}
            sourceLanguage={sourceLanguage}
          />
        </Box>
      </>
    )
  },
)
