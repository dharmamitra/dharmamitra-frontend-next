import { defaultInputEncoding, inputEncodings } from "./params"
import { InputEncoding } from "./types"

export const isInputEncoding = (encoding: unknown): encoding is InputEncoding =>
  Object.values(inputEncodings).some((item) => item === encoding)

export const getValidInputEncoding = (encoding: unknown) => {
  return isInputEncoding(encoding) ? encoding : defaultInputEncoding
}
