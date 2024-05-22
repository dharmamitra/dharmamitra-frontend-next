import Typography from "@mui/material/Typography"

export default function CharacterCount({
  charcaters,
  characterLimit,
  characterLimitReached,
}: {
  charcaters: number
  characterLimit: number
  characterLimitReached: boolean
}) {
  return (
    <Typography color="text.secondary" align="center" variant="body2">
      <Typography
        color={characterLimitReached ? "error" : "text.secondary"}
        variant="body2"
        component="span"
        sx={{
          fontWeight: characterLimitReached ? "500" : "normal",
        }}
      >
        {charcaters}
      </Typography>
      {" / "}
      {characterLimit}
    </Typography>
  )
}
