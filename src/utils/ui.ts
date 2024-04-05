import { inputEncodings } from "@/utils/api/params"

export const encodingKeys = Object.keys(inputEncodings)
export const [primaryEncodingOptions, otherEncodingOptions] = [
  encodingKeys.slice(0, 3),
  encodingKeys.slice(3),
]
