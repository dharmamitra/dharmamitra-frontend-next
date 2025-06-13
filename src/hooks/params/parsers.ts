import { createParser } from "nuqs"

import {
  getValidViewFromIndex,
  getValidViewIndex,
  ViewIndex,
} from "@/utils/api/global/validators"

export const parseAsMultiLineString = createParser({
  parse(paramValue) {
    return paramValue.replace(/\\n/g, "\n")
  },
  serialize(value) {
    return value.replace(/\n/g, "\\n")
  },
})

export const parseAsView = createParser({
  parse(paramValue) {
    return getValidViewIndex(paramValue)
  },
  serialize(value) {
    return getValidViewFromIndex(value as ViewIndex)
  },
})
