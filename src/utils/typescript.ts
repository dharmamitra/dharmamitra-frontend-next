type AtLeastOne<T> = [T, ...T[]]

// https://github.com/microsoft/TypeScript/issues/53171
// https://stackoverflow.com/a/55266531/7794529
export const exhaustiveStringTuple =
  <T extends string>() =>
  <L extends AtLeastOne<T>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...x: L extends any
      ? Exclude<T, L[number]> extends never
        ? L
        : Exclude<T, L[number]>[]
      : never
  ) =>
    x

export type ExtendProperty<T, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P]
}

export type IsIdentical<T, U> =
  (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? true : false
