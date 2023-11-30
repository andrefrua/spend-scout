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
      style={{ width: "250px" }}
      value={options.find(
        option => option[optionIdentifier] === selectedOption
      )}
      onChange={onChange}
      options={options}
      getOptionLabel={option => option[optionLabel]}
      renderInput={params => (
        <TextField {...params} variant="outlined" fullWidth />
      )}
    />
  );
};

export default DataTableAutocomplete;
