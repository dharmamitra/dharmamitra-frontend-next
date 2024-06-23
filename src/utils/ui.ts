export const linkAttrs = {
  color: "secondary",
  target: "_blank",
  rel: "noopener noreferrer",
}

export const localStorageKeys = {
  view: "view-tab",
  searchMode: "advanced-search-mode",
}

export const getSettingPriotiryGroups = <T>(params: {
  setting: T[]
  noOfPrimaryItems: number
}): [T[], T[]] => {
  const { setting, noOfPrimaryItems } = params
  return [setting.slice(0, noOfPrimaryItems), setting.slice(noOfPrimaryItems)]
}

export const getValidDefaultValue = <T>(value: T) => {
  if (value === undefined) {
    throw new Error("default input encoding is undefined")
  }
  return value
}
