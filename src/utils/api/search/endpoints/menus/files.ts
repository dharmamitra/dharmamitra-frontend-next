import apiClients from "../../../client"
import type { MenuFilesRequestQuery, MenuFilesResponseData } from "./types"

const parseTextFileMenuData = (data: MenuFilesResponseData) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.results?.map((text: any) => {
    const { displayName, search_field, textname, filename, category } = text
    return {
      id: filename,
      name: displayName,
      label: search_field,
      fileName: filename,
      textName: textname,
      category,
    }
  })
}

export type ParsedTextFileMenuItem = ReturnType<
  typeof parseTextFileMenuData
>[number]
export type ParsedTextFileMenuData = ParsedTextFileMenuItem[]

export async function getTextFileMenuData(
  query: MenuFilesRequestQuery | undefined,
) {
  if (!query) {
    return []
  }

  const { data } = await apiClients.TempBNv2.GET("/menus/files/", {
    params: { query },
  })

  return data ? parseTextFileMenuData(data) : []
}
