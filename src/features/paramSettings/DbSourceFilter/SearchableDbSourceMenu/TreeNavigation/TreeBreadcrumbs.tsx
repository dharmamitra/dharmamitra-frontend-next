import React from "react"
import { NodeApi } from "react-arborist"
import { Box, Button, Typography } from "@mui/material"
import { lighten } from "@mui/material/styles"
import { useAtom } from "jotai"

import { activeDbSourceTreeBreadcrumbsAtom } from "@/atoms"
import { type DbSourceTreeNode } from "@/features/paramSettings/DbSourceFilter/types"

import { getTreeBreadcrumbs } from "../utils"

type HandleBreadcrumbClickProps = {
  node: NodeApi<DbSourceTreeNode> | null | undefined
  setBreadcrumbs: React.Dispatch<
    React.SetStateAction<NodeApi<DbSourceTreeNode>[]>
  >
}

const handleBreadcrumbClick = ({
  node,
  setBreadcrumbs,
}: HandleBreadcrumbClickProps) => {
  if (!node) return

  node?.select()
  node?.toggle()

  const crumbs = getTreeBreadcrumbs(node)
  setBreadcrumbs(crumbs)
}

const TreeBreadcrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = useAtom(
    activeDbSourceTreeBreadcrumbsAtom,
  )

  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        listStyle: "none",
        margin: "0",
        padding: "0",
        gap: "0.25rem",
      }}
    >
      {breadcrumbs.map((node) => (
        <Box
          key={`${node.id}-${node.level}-breadcrumb`}
          component="li"
          sx={{
            clipPath:
              "polygon(0 0,calc(100% - 1rem) 0,100% 50%,calc(100% - 1rem) 100%,0 100%,1rem 50%)",
            margin: "0 calc(1rem/-2)",
            "&:first-of-type": {
              clipPath:
                "polygon(0 0,calc(100% - 1rem) 0,100% 50%,calc(100% - 1rem) 100%,0 100%)",
              marginLeft: "0",
            },
            "&:last-of-type": {
              marginRight: 0,
            },
          }}
        >
          <Button
            sx={(theme) => ({
              display: "block",
              height: "100%",
              paddingInline: "1.25rem",
              ...(node.level === 0 && {
                paddingInline: "0.5rem 1.25rem",
              }),
              color: theme.palette.text.primary,
              background: theme.custom.palette?.background?.selected,
              "&:hover": {
                background: lighten(
                  theme.custom.palette?.background?.selected ?? "lightgray",
                  0.2,
                ),
              },
            })}
            onClick={() => handleBreadcrumbClick({ node, setBreadcrumbs })}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.7rem",
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                fontSize="inherit"
              >
                {node.id}
              </Typography>
            </Box>
          </Button>
        </Box>
      ))}
    </Box>
  )
}

export default TreeBreadcrumbs
