interface TryError extends Error {
  status?: number
}

type TrySuccess<T> = { result: T; error: null }
type TryFailure<E> = { result: null; error: E }
type TryResult<T, E = TryError> = TrySuccess<T> | TryFailure<E>

/**
 * tryCatch - Synchronous error handling.
 *
 * @param fn Synchronous function to execute.
 * @param operationName Optional name for context.
 * @returns A TryResult object.
 * @see https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b for original concept
 */
export function tryCatch<T>(fn: () => T, operationName?: string): TryResult<T> {
  try {
    const result = fn()
    return { result, error: null }
  } catch (rawError: unknown) {
    const processedError = rawError instanceof Error ? rawError : new Error(String(rawError))

    if (operationName) {
      processedError.message = `Operation "${operationName}" failed: ${processedError.message}`
    }
    return { result: null, error: processedError }
  }
}

/**
 * awaitedTryCatch - Asynchronous error handling for functions returning a Promise.
 *
 * @param fn Asynchronous function to execute (must return a Promise).
 * @param operationName Optional name for context.
 * @returns A Promise resolving to a TryResult object.
 * @see https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b for original concept
 */
export async function awaitedTryCatch<T>(
  fn: () => Promise<T>,
  operationName?: string,
): Promise<TryResult<T>> {
  try {
    const result = await fn()

    if (result instanceof Response && !result.ok) {
      const payload = await result.json()
      const err = `${payload?.error || "Unknown error"}. (Error ${result.status})`
      throw new Error(err)
    }

    return { result, error: null }
  } catch (rawError: unknown) {
    const processedError = rawError instanceof Error ? rawError : new Error(String(rawError))

    if (operationName) {
      processedError.message = `Operation "${operationName}" failed: ${processedError.message}`
    }
    return { result: null, error: processedError }
  }
}
