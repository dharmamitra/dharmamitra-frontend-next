import { Typography } from "@mui/material"

import InactiveTreeHead, { InactiveTreeHeadProps } from "./InactiveTreeHead"

type TreeExceptionProps = {
  message: string
} & InactiveTreeHeadProps

export function TreeException(props: TreeExceptionProps) {
  return (
    <>
      <InactiveTreeHead {...props} />

      <Typography sx={{ mt: 4 }} color="error.main">
        {props.message}
      </Typography>
    </>
  )
}
