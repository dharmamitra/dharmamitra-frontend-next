import Typography from "@mui/material/Typography"

export default function CharacterCount({
  charcaters,
  limit,
  limitReached,
}: {
  charcaters: number
  limit: number
  limitReached: boolean
}) {
  return (
    <Typography color="text.secondary" align="center" variant="body2">
      <Typography
        color={limitReached ? "error" : "text.secondary"}
        variant="body2"
        component="span"
        sx={{
          fontWeight: limitReached ? "500" : "normal",
        }}
      >
        {charcaters}
      </Typography>
      {" / "}
      {limit}
    </Typography>
  )
}
