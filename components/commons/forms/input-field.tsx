import {
  Autocomplete,
  Box,
  Options,
  TextField,
  TextFieldProps,
} from "@mui/material";

export interface InputOptions extends Options {
  id?: number;
  label?: string;
}

interface TypeProps {
  id?: string;
  options?: Array<InputOptions>;
  onChange?: Required<TextFieldProps>["onChange"];
}

const InputField = ({
  id = "input-field",
  options = [],
  onChange = () => 0,
}: TypeProps) => {
  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <Autocomplete
        disablePortal
        id={id}
        options={options}
        sx={{ width: 300, display: "inline-block" }}
        noOptionsText={"첫재료"}
        renderInput={(params) => (
          <TextField {...params} label="재료" onChange={onChange} />
        )}
      />
      <TextField
        id={`amount-${id}`}
        label="수량"
        color="secondary"
        onChange={onChange}
        focused
      />
    </Box>
  );
};

export default InputField;
