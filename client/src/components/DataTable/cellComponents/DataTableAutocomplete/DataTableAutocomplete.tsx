import { Autocomplete, TextField } from "@mui/material";

interface DataTableAutocompleteProps {
  options: any[];
  optionIdentifier: string;
  optionLabel: string;
  selectedOption: string;
  onChange: (event: any, newValue: any) => void;
}

const DataTableAutocomplete = ({
  options,
  optionIdentifier,
  optionLabel,
  selectedOption,
  onChange
}: DataTableAutocompleteProps) => {
  return (
    <Autocomplete
      style={{ width: "20vw", padding: "0", margin: "0" }}
      fullWidth
      value={options.find(
        option => option[optionIdentifier] === selectedOption
      )}
      onChange={onChange}
      options={options}
      getOptionLabel={option => option[optionLabel]}
      sx={theme => {
        const { palette } = theme;
        const borderColor = palette.dark.main;
        return {
          "& .MuiOutlinedInput-root": {
            // border: "1px solid yellow",
            borderRadius: "10px"
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${borderColor}`
          }
        };
      }}
      renderInput={params => (
        <TextField {...params} variant="outlined" size="small" fullWidth />
      )}
    />
  );
};

export default DataTableAutocomplete;
