type UpdateSourceFilterPropParam = {
  prevValue: string[] | null
  id: string
  action: "add" | "remove"
}

export const updateSourceFilterPropParam = ({
  prevValue,
  id,
  action,
}: UpdateSourceFilterPropParam) => {
  if (action === "add") {
    return [...(prevValue ?? []), id]
  }

  if (action === "remove" && prevValue) {
    const updatedValue = prevValue.filter((item) => item !== id)
    return updatedValue.length > 0 ? updatedValue : null
  }

  return prevValue
}
