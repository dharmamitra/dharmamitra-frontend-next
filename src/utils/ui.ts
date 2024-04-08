import { inputEncodings } from "@/utils/api/params"

// TODO: this should be removed (and added as to the setting param in `getSettingPriotiryGroups`) once BE has de-multi-mapped option->param
export const encodingKeys = Object.keys(inputEncodings)

export const getSettingPriotiryGroups = <T>(params: {
  setting: T[]
  noOfPrimaryItems: number
}): [T[], T[]] => {
  const { setting, noOfPrimaryItems } = params
  return [setting.slice(0, noOfPrimaryItems), setting.slice(noOfPrimaryItems)]
}
