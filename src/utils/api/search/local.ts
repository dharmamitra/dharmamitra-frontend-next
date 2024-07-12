import { exhaustiveStringTuple } from "@/utils/typescript"

import { SearchTarget, SearchTargets, LocalParams } from "./types"

export type { SearchTarget, LocalParams }

export const searchTargets: SearchTarget[] =
  exhaustiveStringTuple<SearchTargets>()("parallel", "primary", "secondary")
export const defaultSearchTarget = "parallel"
export const disabledSearchTargets: SearchTarget[] = ["secondary"]

export const localParamNames: Record<keyof LocalParams, keyof LocalParams> = {
  search_target: "search_target",
}
