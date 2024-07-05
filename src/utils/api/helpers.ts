/* eslint-disable @typescript-eslint/no-explicit-any */

import { SearchApiTypes } from "@/api"

export type APIRequestBody<operation> = "requestBody" extends keyof operation
  ? "content" extends keyof operation["requestBody"]
    ? "application/json" extends keyof operation["requestBody"]["content"]
      ? operation["requestBody"]["content"]["application/json"]
      : never
    : never
  : never

export type APIRequestParams<operation> = "parameters" extends keyof operation
  ? "query" extends keyof operation["parameters"]
    ? operation["parameters"]["query"]
    : never
  : never

export type APIResponse<operation> = "responses" extends keyof operation
  ? 200 extends keyof operation["responses"]
    ? "content" extends keyof operation["responses"][200]
      ? "application/json" extends keyof operation["responses"][200]["content"]
        ? operation["responses"][200]["content"]["application/json"]
        : never
      : never
    : never
  : never

type CommonKeys<T extends any[]> = T extends [infer F, ...infer R]
  ? keyof F & CommonKeys<R>
  : keyof any

export type CommonProperties<T extends any[]> = {
  [K in CommonKeys<T>]: T[number][K]
}
// export type PropertiesCommonToAll<T extends any[]> = {
//   [K in CommonKeys<T>]: T[number][K]
// }

// type UnionKeys<T extends any[]> = T extends [infer F, ...infer R]
//   ? keyof F | UnionKeys<R>
//   : never

// type ExtractType<T, K> = T extends any
//   ? K extends keyof T
//     ? T[K]
//     : never
//   : never

// export type CommonProperties<T extends any[]> = {
//   [K in UnionKeys<T>]: ExtractType<T[number], K>
// }

export function parseAPIRequestBody<
  T extends {
    filter_source_data?: SearchApiTypes.ParallelRequestBody["filter_source_data"]
  },
>(body: T) {
  const filter_source_data = body?.filter_source_data
    ? JSON.parse(body.filter_source_data as string)
    : {}

  return { ...body, filter_source_data }
}
