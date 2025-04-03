import {
  defaultInputEncoding,
  defaultView,
  inputEncodings,
  views,
} from "./params"
import { InputEncoding, View } from "./types"

export const isInputEncoding = (encoding: unknown): encoding is InputEncoding =>
  Object.values(inputEncodings).some((item) => item === encoding)

export const getValidInputEncoding = (encoding: unknown) => {
  return isInputEncoding(encoding) ? encoding : defaultInputEncoding
}

export const isValidView = (view: unknown): view is View =>
  Object.values(views).some((item) => item === view)

export const getValidView = (view: unknown) => {
  return isValidView(view) ? view : defaultView
}

export type ViewIndex = 0 | 1 | 2

const viewToIndexMap: Record<View, ViewIndex> = {
  search: 0,
  translation: 1,
  ocr: 2,
}

const indexToViewMap: Record<ViewIndex, View> = {
  0: "search",
  1: "translation",
  2: "ocr",
}

export const getValidViewIndex = (paramValue: string) => {
  const view = getValidView(paramValue)
  return viewToIndexMap[view]
}

export const getValidViewFromIndex = (index: ViewIndex) => {
  return indexToViewMap[index]
}
