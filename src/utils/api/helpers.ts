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

export type CommonProperties<T, U> = {
  [K in keyof T & keyof U]: T[K] | U[K]
}
