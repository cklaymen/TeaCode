import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  value: string;
  onChange(value: string): void;
}

const Search: React.FC<Props> = ({ onChange, value }) => (
  <FormControl variant="standard" fullWidth>
    <TextField
      id="input-with-icon-adornment"
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </FormControl>
);

export default Search;
