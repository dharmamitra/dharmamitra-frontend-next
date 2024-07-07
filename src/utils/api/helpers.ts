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

type UnionKeys<T extends any[]> = T extends [infer F, ...infer R]
  ? keyof F | UnionKeys<R>
  : never

type UniqueKeys<
  T extends any[],
  AllKeys = UnionKeys<T>,
> = AllKeys extends keyof any
  ? AllKeys extends keyof T[number]
    ? never
    : AllKeys
  : never

type ExtractType<T, K> = T extends any
  ? K extends keyof T
    ? T[K]
    : never
  : never

export type UniqueProperties<T extends any[]> = {
  [K in UniqueKeys<T>]: ExtractType<T[number], K>
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
    source_limits?: SearchApiTypes.SearchLimits
    limits?: SearchApiTypes.SearchLimits
  },
>(body: T) {
  const source_limits = body?.source_limits
    ? JSON.parse(body.source_limits as string)
    : {}
  const limits = body?.limits ? JSON.parse(body.limits as string) : {}

  if (Object.keys(source_limits).length > 0) {
    return { ...body, source_limits }
  }

  if (Object.keys(limits).length > 0) {
    return { ...body, limits }
  }

  return body
}
