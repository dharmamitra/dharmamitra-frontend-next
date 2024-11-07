import { DbSourceTreeNodeDataType as NodeType } from "@/features/paramSettings/DbSourceFilter/types"

type HandleSourceFilterPropUpdate = {
  prevValue: string[] | undefined | null
  id: string
  action: "add" | "remove"
}

const handleSourceFilterPropUpdate = ({
  prevValue,
  id,
  action,
}: HandleSourceFilterPropUpdate) => {
  if (action === "add") {
    return [...(prevValue ?? []), id]
  }

  if (action === "remove" && prevValue) {
    const updatedValue = prevValue.filter((item) => item !== id)
    return updatedValue.length > 0 ? updatedValue : null
  }

  return prevValue ?? null
}

type UpdateSourceFilterProp = {
  filterNodeType: NodeType
  dataType: NodeType
} & HandleSourceFilterPropUpdate

export const updateSourceFilterProp = ({
  filterNodeType,
  dataType,
  prevValue,
  id,
  action,
}: UpdateSourceFilterProp) =>
  dataType === filterNodeType
    ? handleSourceFilterPropUpdate({ prevValue, id, action })
    : prevValue
