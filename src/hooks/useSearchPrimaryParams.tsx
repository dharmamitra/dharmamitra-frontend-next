import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  SearchFilterLanguage,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  primary: { filter_language, limits: limitsParamName },
} = searchParamsNames

const useSearchPrimaryParams = () => {
  const { getSearchParam } = useParams()

  const filterLanguage = getSearchParam(filter_language) as SearchFilterLanguage
  const { handleValueChange: updateFilterLanguage } =
    useParamValueWithLocalStorage({
      paramName: filter_language,
      defaultValue: undefined,
    })

  const { input: limits, handleValueChange: updateLimits } =
    useInputWithUrlParam<string>(limitsParamName)

  return {
    filterLanguage,
    updateFilterLanguage,
    limits,
    updateLimits,
  }
}

export default useSearchPrimaryParams
