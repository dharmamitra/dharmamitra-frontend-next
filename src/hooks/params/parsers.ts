import { createParser, Parser } from "nuqs"

import { defaultView, views } from "@/utils/api/global/params"
import { View } from "@/utils/api/global/types"

export const parseAsMultiLineString = createParser({
  parse(paramValue) {
    return paramValue.replace(/\\n/g, "\n")
  },
  serialize(value) {
    return value.replace(/\n/g, "\\n")
  },
})

export const parseAsView: Parser<View> = {
  parse: (v) => {
    if (v && views.includes(v as View)) {
      return v as View
    }
    return null
  },

  serialize: (v) => {
    if (views.includes(v)) {
      return v
    }
    return defaultView
  },
}
