type TrySuccess<T> = { result: T; error: null }
type TryFailure<E> = { result: null; error: E }
type TryResult<T, E = Error> = TrySuccess<T> | TryFailure<E>

/**
 * tryCatch - Error handling that can be synchronous or asynchronous
 * based on the input function.
 *
 * @param fn Function to execute.
 * @param operationName Optional name for context.
 * @returns A Result, or a Promise resolving to a Result, depending on fn.
 * @see https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b
 */
export function tryCatch<T>(
  fn: () => T | Promise<T>,
  operationName?: string,
): TryResult<T, Error> | Promise<TryResult<T, Error>> {
  try {
    const res = fn()
    if (res instanceof Promise) {
      return res
        .then((result) => ({ result, error: null }))
        .catch((rawError: unknown) => {
          const processedError =
            rawError instanceof Error ? rawError : new Error(String(rawError))

          if (operationName) {
            processedError.message = `Operation "${operationName}" failed: ${processedError.message}`
          }
          return { result: null, error: processedError }
        })
    } else {
      return { result: res, error: null }
    }
  } catch (rawError: unknown) {
    const processedError =
      rawError instanceof Error ? rawError : new Error(String(rawError))

    if (operationName) {
      processedError.message = `Operation "${operationName}" failed: ${processedError.message}`
    }
    return { result: null, error: processedError }
  }
}
