import { defaultInputEncoding, inputEncodings, modelTypes } from "./params"
import { InputEncoding, ModelType } from "./types"

export const isInputEncoding = (encoding: unknown): encoding is InputEncoding =>
  Object.values(inputEncodings).some((item) => item === encoding)

export const getValidInputEncoding = (encoding: unknown) => {
  return isInputEncoding(encoding) ? encoding : defaultInputEncoding
}

export const validateModel = (model: unknown): model is ModelType =>
  modelTypes.some((m) => m === model)
