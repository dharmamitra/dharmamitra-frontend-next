import SearchIcon from "@mui/icons-material/Search"
import { FormControl, InputAdornment, TextField } from "@mui/material"

export type InactiveTreeHeadProps = {
  padding?: number
}

function InactiveTreeHead({ padding }: InactiveTreeHeadProps) {
  return (
    <>
      <FormControl variant="outlined" sx={{ p: padding, pb: 0 }} fullWidth>
        <TextField
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          disabled
        />
      </FormControl>
    </>
  )
}

export default InactiveTreeHead
