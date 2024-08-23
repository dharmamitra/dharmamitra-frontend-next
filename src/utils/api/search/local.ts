import { exhaustiveStringTuple } from "@/utils/typescript"

import { LocalParams, SearchTarget, SearchTargets } from "./types"

export type { LocalParams, SearchTarget }

export const searchTargets: SearchTarget[] =
  exhaustiveStringTuple<SearchTargets>()("primary", "parallel", "secondary")
export const defaultSearchTarget = "primary"
export const disabledSearchTargets: SearchTarget[] = ["secondary"]

export const localParamNames: Record<keyof LocalParams, keyof LocalParams> = {
  search_target: "search_target",
}
