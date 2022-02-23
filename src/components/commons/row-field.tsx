import TextField, { TextFieldProps } from "@mui/material/TextField";

type RowFieldProps = TextFieldProps & {
  width?: string;
};

const RowField = ({ width, value, onChange, ...props }: RowFieldProps) => {
  return (
    <TextField
      size="small"
      sx={{ width: width ?? "100%" }}
      {...props}
      value={value}
      onChange={onChange}
    />
  );
};

export default RowField;
