import { useMemo } from "react"

export default function useTranslationDisabled(
  input: string,
  queryId: string,
  completedQueryIds: Set<string>,
) {
  return useMemo(() => {
    const hasNoInput = !input.match(/\S+/g)?.length
    const isAlreadyCompleted = completedQueryIds.has(queryId)
    return hasNoInput || isAlreadyCompleted
  }, [input, queryId, completedQueryIds])
}
