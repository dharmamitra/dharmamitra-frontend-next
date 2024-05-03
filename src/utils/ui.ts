export const getSettingPriotiryGroups = <T>(params: {
  setting: T[]
  noOfPrimaryItems: number
}): [T[], T[]] => {
  const { setting, noOfPrimaryItems } = params
  return [setting.slice(0, noOfPrimaryItems), setting.slice(noOfPrimaryItems)]
}

export const translationInputLimit = 524 as const

export const linkAttrs = {
  color: "secondary",
  target: "_blank",
  rel: "noopener noreferrer",
}
