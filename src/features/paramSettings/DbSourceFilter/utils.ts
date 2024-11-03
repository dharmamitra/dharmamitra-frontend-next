export const updateSourceFilterProp = ({
  prevValue,
  id,
  action,
}: {
  prevValue: string[] | undefined
  id: string
  action: "add" | "remove"
}) => {
  if (action === "add") {
    return [...(prevValue ?? []), id]
  }

  if (action === "remove" && prevValue) {
    const updatedValue = prevValue.filter((item) => item !== id)
    return updatedValue.length > 0 ? updatedValue : undefined
  }

  return prevValue
}
