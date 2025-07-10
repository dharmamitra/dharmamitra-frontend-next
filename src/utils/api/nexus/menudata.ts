import { transformDataForTreeView } from "@/components/features/paramSettings/DbSourceFilter/SearchableDbSourceMenu/utils"

import apiClients from "../client"
import type { APIGetRequestQuery, APIGetResponse } from "./types"

function parseStructuredDbSourceMenuData(data: APIGetResponse<"/menudata/">) {
  return data.menudata.map(({ collection, categories }) => ({
    collection,
    categories: categories.map(({ files, categorydisplayname, category: categoryName }) => ({
      files: files.map(({ displayName, filename, search_field }) => ({
        displayName,
        searchField: search_field,
        fileName: filename,
        category: categoryName,
      })),
      name: categoryName,
      displayName: categorydisplayname,
    })),
  }))
}

export type ParsedStructuredDbSourceMenuData = ReturnType<typeof parseStructuredDbSourceMenuData>

export async function getDbSourceMenuData(query: APIGetRequestQuery<"/menudata/">) {
  const { data } = await apiClients.Nexus.GET("/menudata/", {
    params: { query },
  })

  const parsedApiData = data ? parseStructuredDbSourceMenuData(data) : []
  return transformDataForTreeView(parsedApiData)
}
