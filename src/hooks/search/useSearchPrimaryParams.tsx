import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  defaultSearchFilterLanguage,
  SearchFilterLanguage,
  searchParamsNames,
} from "@/utils/api/search/params"
import useSearchCommonParams from "./useSearchCommonParams"

const {
  primary: { filter_language, limits: limitsParamName },
} = searchParamsNames

const useSearchPrimaryParams = () => {
  const { getSearchParam } = useParams()
  const { searchTarget } = useSearchCommonParams()

  const filterLanguage = getSearchParam(filter_language) as SearchFilterLanguage
  const { handleValueChange: updateFilterLanguage } =
    useParamValueWithLocalStorage({
      paramName: filter_language,
      defaultValue:
        searchTarget === "primary" ? defaultSearchFilterLanguage : undefined,
    })

  const { input: limits, handleValueChange: updateLimits } =
    useInputWithUrlParam<string | null>(limitsParamName)

  return {
    filterLanguage,
    updateFilterLanguage,
    limits,
    updateLimits,
  }
}

export default useSearchPrimaryParams
