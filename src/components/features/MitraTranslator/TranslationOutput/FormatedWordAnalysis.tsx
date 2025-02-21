import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

type splitFromEndProps = {
  line: string
  delimiter: string
  count: number
}
function splitFromEnd({ line, delimiter, count }: splitFromEndProps) {
  const parts = line.split(delimiter)
  const splitIndex = parts.length - count
  const firstPart = parts.slice(0, splitIndex).join(delimiter)
  const lastParts = parts.slice(splitIndex)
  return [firstPart, ...lastParts]
}

export default function FormatedWordAnalysis({ line }: { line: string }) {
  const [term, type, definition] = splitFromEnd({
    line,
    delimiter: ",",
    count: 2,
  })

  return (
    <Box py={0.5}>
      <Typography component="div" lineHeight={1}>
        <Typography component="i" fontStyle="normal" fontWeight={500}>
          {term?.trim()}
        </Typography>
        <Typography component="span" px={1} color="text.secondary">
          ({type?.trim()})
        </Typography>
      </Typography>
      <Typography lineHeight={1}>{definition?.trim()}</Typography>
    </Box>
  )
}
