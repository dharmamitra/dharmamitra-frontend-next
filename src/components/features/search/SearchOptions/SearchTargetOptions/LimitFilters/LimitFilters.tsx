import React, { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material"

import useParams from "@/hooks/useParams"
import {
  useSourceTextMenus,
  UseSourceTextMenusProps,
} from "@/hooks/useSourceTextMenus"
import type { ParsedCategoryMenuItem } from "@/utils/api/search/endpoints/menus/category"
import type { ParsedTextFileMenuItem } from "@/utils/api/search/endpoints/menus/files"

import ListboxComponent from "./ListboxComponent"
import { StyledPopper } from "./muiStyledComponents"

type LimitsFilterValue = {
  category_include?: ParsedCategoryMenuItem[]
  file_include?: ParsedTextFileMenuItem[]
}

type LimitsParam = {
  category_include?: string[]
  file_include?: string[]
}

type Limit = keyof LimitsFilterValue &
  keyof Messages["search"]["limits"]["labels"]

const limits: Limit[] = ["category_include", "file_include"]

type LimitValueOption = (
  | ParsedCategoryMenuItem
  | Pick<ParsedTextFileMenuItem, "id" | "name" | "label">
)[]

function getValuesFromParams(
  params: LimitsParam,
  texts: Map<string, ParsedTextFileMenuItem>,
  categories: Map<string, ParsedCategoryMenuItem>,
) {
  return Object.entries(params).reduce((values, [filter, selections]) => {
    const list = filter.startsWith("category") ? categories : texts

    const filterItems = selections.map((id) => list.get(id))

    return { ...values, [filter]: filterItems }
  }, {})
}

function getParamsFromValues(
  updatedLimit: Limit,
  updatedvalue: LimitValueOption,
  params: LimitsParam,
) {
  // eslint-disable-next-line no-unused-vars
  const { [updatedLimit]: prevValue, ...otherLimitParams } = params

  const updatedParam = updatedvalue.map((item) => item.id)
  return {
    ...otherLimitParams,
    ...(updatedParam.length > 0 && {
      [updatedLimit]: updatedParam,
    }),
  }
}

export type LimitFiltersProps = {
  limitParamName: string
  limitParamStringValue: string
} & UseSourceTextMenusProps

const LimitFilters = ({
  limitParamName,
  limitParamStringValue,
  ...textMenuParams
}: LimitFiltersProps) => {
  const t = useTranslations("search")

  const { texts, isLoadingTexts, categories, isLoadingCategories } =
    useSourceTextMenus(textMenuParams)

  const { createQueryString, updateParams } = useParams()

  const [limitsValue, setLimitsValue] = useState<LimitsFilterValue>({})
  const isInitilized = React.useRef(false)
  const isValueSet = React.useRef(false)

  const updateLimitsValue = React.useCallback(() => {
    if (!isInitilized.current && !isLoadingTexts && !isLoadingCategories) {
      const values = getValuesFromParams(
        JSON.parse(limitParamStringValue || "{}"),
        texts,
        categories,
      )
      setLimitsValue(values)
      isInitilized.current = true
    }
  }, [
    isLoadingTexts,
    isLoadingCategories,
    texts,
    categories,
    setLimitsValue,
    limitParamStringValue,
  ])

  const handleGlobalParamReset = React.useCallback(() => {
    // `isValueSet` deals with param-value setting cycle
    // and avoids selection flicker & update lag
    isValueSet.current = false
    setLimitsValue({})
  }, [isValueSet, setLimitsValue])

  useEffect(() => {
    if (!isValueSet.current && limitParamStringValue) {
      isValueSet.current = true
      return
    }

    if (isValueSet.current && !limitParamStringValue) {
      handleGlobalParamReset()
      return
    }

    updateLimitsValue()
  }, [
    updateLimitsValue,
    isValueSet,
    handleGlobalParamReset,
    limitParamStringValue,
  ])

  const handleInputChange = (limit: Limit, value: LimitValueOption) => {
    // eslint-disable-next-line no-unused-vars
    const { [limit]: prevValue, ...otherLimitValues } = limitsValue

    const updatedLimitValues =
      value.length > 0
        ? { ...otherLimitValues, [limit]: value }
        : otherLimitValues
    setLimitsValue(updatedLimitValues)

    const updatedParams = getParamsFromValues(
      limit,
      value,
      JSON.parse(limitParamStringValue || "{}"),
    )
    updateParams(
      createQueryString(limitParamName, JSON.stringify(updatedParams)),
    )
  }

  const limitFilters = React.useMemo(() => {
    return limits.map((limit) => {
      const filter = limit.startsWith("file")
        ? { options: Array.from(texts.values()), isLoading: isLoadingTexts }
        : {
            options: Array.from(categories.values()),
            isLoading: isLoadingCategories,
          }

      return {
        filterName: limit,
        filter,
      }
    })
  }, [categories, texts, isLoadingTexts, isLoadingCategories])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {limitFilters.map((limit) => {
          const {
            filterName,
            filter: { options, isLoading },
          } = limit

          const filterValue = limitsValue[filterName]

          return (
            <Box key={`limit-filter-${filterName}`} sx={{ width: 300 }}>
              <Autocomplete
                id={filterName}
                multiple={true}
                value={(filterValue as LimitValueOption) ?? []}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                PopperComponent={StyledPopper}
                // sets the rendered option label
                ListboxComponent={ListboxComponent}
                options={options}
                getOptionLabel={(option) =>
                  `${option.id.toUpperCase()} ${option.name}`
                }
                limitTags={3}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="secondary"
                    label={t(`limits.labels.${filterName}`)}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) =>
                  [props, option] as React.ReactNode
                }
                renderGroup={(params) => params as unknown as React.ReactNode}
                loading={isLoading}
                filterSelectedOptions
                disablePortal
                onChange={(event, value) =>
                  handleInputChange(filterName, value)
                }
              />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default LimitFilters
