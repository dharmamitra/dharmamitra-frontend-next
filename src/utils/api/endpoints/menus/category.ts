import { tempBNv2Client as apiClient } from "../../client"
import type {
  MenuFilterCategoriesRequestQuery,
  MenuFilterCategoriesResponseData,
} from "./tempTypes"

export interface ParsedCategoryMenuItem {
  id: string
  name: string
  label: string
}

const parseCategoryMenuData = (data: MenuFilterCategoriesResponseData) => {
  return data.categoryitems.reduce(
    (map: Map<string, ParsedCategoryMenuItem>, currentCategory) => {
      const { category, categoryname } = currentCategory

      if (!category || !categoryname) {
        return map
      }

      const value: ParsedCategoryMenuItem = {
        id: category,
        name: categoryname,
        label: `${category} ${categoryname}`,
      }

      map.set(category, value)
      return map
    },
    new Map(),
  )
}

export type ParsedCategoryMenuData = ReturnType<typeof parseCategoryMenuData>

export async function getCategoryMenuData(
  query: MenuFilterCategoriesRequestQuery,
) {
  if (!query.language) {
    return new Map()
  }

  const { data } = await apiClient.GET("/menus/category/", {
    params: { query },
  })

  return data ? parseCategoryMenuData(data) : new Map()
}
