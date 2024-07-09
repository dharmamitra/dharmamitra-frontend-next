import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  defaultSearchFilterLanguage,
  SearchFilterLanguage,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  parallel: { filter_source_language, filter_target_language, source_limits },
} = searchParamsNames

const useSearchParallelParams = () => {
  const { getSearchParam } = useParams()

  const filterSourceLanguage = getSearchParam(
    filter_source_language,
  ) as SearchFilterLanguage
  const { handleValueChange: updateFilterSourceLanguage } =
    useParamValueWithLocalStorage({
      paramName: filter_source_language,
      defaultValue: defaultSearchFilterLanguage,
    })

  const filterTargetLanguage = getSearchParam(
    filter_target_language,
  ) as SearchFilterLanguage
  const { handleValueChange: updateFilterTargetLanguage } =
    useParamValueWithLocalStorage({
      paramName: filter_target_language,
      defaultValue: defaultSearchFilterLanguage,
    })

  const { input: sourceLimits, handleValueChange: updateSourceLimits } =
    useInputWithUrlParam<string>(source_limits)

  return {
    filterSourceLanguage,
    updateFilterSourceLanguage,
    filterTargetLanguage,
    updateFilterTargetLanguage,
    sourceLimits,
    updateSourceLimits,
  }
}

export default useSearchParallelParams
