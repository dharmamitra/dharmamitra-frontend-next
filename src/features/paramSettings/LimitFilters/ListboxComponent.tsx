import React from "react"
import { type ListChildComponentProps, VariableSizeList } from "react-window"
import { Tooltip, Typography } from "@mui/material"

import {
  ListItemLabel,
  ListItemLabelWapper,
  RowItem,
} from "./muiStyledComponents"

const OuterElementContext = React.createContext({})

export interface OuterElementProps extends React.ComponentPropsWithRef<"div"> {}

// eslint-disable-next-line react/display-name
const OuterElementType = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <ul ref={ref} {...props} {...outerProps} />
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null)
  React.useEffect(() => {
    // eslint-disable-next-line eqeqeq,no-eq-null
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

const LISTBOX_PADDING_PX = 8
const maxLines = 1
const defaultItemHeight = 60
const lineHeight = 37
const charsPerLine = 28

const trimName = (name: string) => {
  return name.replaceAll(/^•\s/g, "")
}
const createMenuItemLabel = (id: string, name: string) =>
  `${id}: ${trimName(name)}`

const getNumberOfLines = (lable: string) => {
  const lines = Math.ceil(lable.length / charsPerLine)
  return lines
}

const Rows = (props: ListChildComponentProps) => {
  const { data, index, style } = props
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING_PX,
    fontWeight: 700,
  }
  const [dataSetProps, { name, id }] = dataSet
  // eslint-disable-next-line no-unused-vars
  const { key, ...rowItemProps } = dataSetProps

  const lable = createMenuItemLabel(id, name)
  const isTruncated = lable.length > charsPerLine * maxLines + 1

  return (
    <RowItem inheretedstyles={inlineStyle} {...rowItemProps} component="li">
      <ListItemLabelWapper maxLines={maxLines}>
        <Tooltip
          title={<Typography>{lable}</Typography>}
          disableHoverListener={!isTruncated}
          enterDelay={1500}
        >
          <ListItemLabel variant="body2">
            <Typography
              fontWeight={600}
              component="span"
              textTransform="uppercase"
              sx={{
                color: "text.secondary",
                fontSize: "1rem !important",
              }}
            >
              ({id})
            </Typography>{" "}
            {trimName(name)}
          </ListItemLabel>
        </Tooltip>
      </ListItemLabelWapper>
    </RowItem>
  )
}

const getChildSize = (child: React.ReactNode) => {
  // @ts-expect-error type issue
  const [, itemData] = child
  const { id, name } = itemData
  const lines = getNumberOfLines(createMenuItemLabel(id, name))
  const itemHeight = lines * lineHeight

  return lines <= maxLines ? itemHeight : lineHeight * maxLines
}

const getListHeight = (itemData: React.ReactNode[]) => {
  if (itemData.length > 8) {
    return 10 * defaultItemHeight
  }
  return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props
  const itemData: React.ReactNode[] = []

  if (Array.isArray(children)) {
    children.forEach(
      (item: React.ReactNode & { children?: React.ReactNode[] }) => {
        itemData.push(item, ...(item.children ?? []))
      },
    )
  }

  const itemCount = itemData.length

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref} style={{ padding: "0" }}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          ref={gridRef}
          itemData={itemData}
          height={getListHeight(itemData) + 2 * LISTBOX_PADDING_PX}
          width="100%"
          // TODO: resolve type issue
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          outerElementType={OuterElementType as any}
          innerElementType="ul"
          itemSize={(index: number) => getChildSize(itemData[index] ?? 0)}
          overscanCount={20}
          itemCount={itemCount}
        >
          {Rows}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

export default ListboxComponent
