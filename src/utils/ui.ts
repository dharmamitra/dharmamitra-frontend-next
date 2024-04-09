export const getSettingPriotiryGroups = <T>(params: {
  setting: T[]
  noOfPrimaryItems: number
}): [T[], T[]] => {
  const { setting, noOfPrimaryItems } = params
  return [setting.slice(0, noOfPrimaryItems), setting.slice(noOfPrimaryItems)]
}
