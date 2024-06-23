import type { components, paths } from "@/lib/api/bnv2"

import { APIRequestParams, APIResponse } from "../../types"

export type Schema = components["schemas"]

/**
 * REQUEST & RESPONSE MODELS
 */

/** MENUS */

export type MenuFilesRequestQuery = APIRequestParams<
  paths["/menus/files/"]["get"]
>
export type MenuFilesResponseData = APIResponse<paths["/menus/files/"]["get"]>

export type MenuFilterFilesRequestQuery = APIRequestParams<
  paths["/menus/filter/"]["get"]
>
export type MenuFilterFilesResponseData = APIResponse<
  paths["/menus/filter/"]["get"]
>

export type MenuFilterCategoriesRequestQuery = APIRequestParams<
  paths["/menus/category/"]["get"]
>
export type MenuFilterCategoriesResponseData = APIResponse<
  paths["/menus/category/"]["get"]
>

export type MenuAllCollectionsResponseData = APIResponse<
  paths["/menus/collections/"]["get"]
>

export type MenuSidebarRequestQuery = APIRequestParams<
  paths["/menus/sidebar/"]["get"]
>
export type MenuSidebarResponseData = APIResponse<
  paths["/menus/sidebar/"]["get"]
>

/**
 * COMMON
 */
