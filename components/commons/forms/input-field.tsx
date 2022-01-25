import {
  Autocomplete,
  Box,
  createFilterOptions,
  FilterOptionsState,
  Options,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import IconButton from "@mui/material/IconButton";

const filter = createFilterOptions<InputOptions>();

export interface InputOptions extends Options {
  inputValue?: string;
  id?: number;
  label?: string;
  value?: number;
}

interface TypeProps {
  id?: string;
  options?: Array<InputOptions>;
  selected?: InputOptions;
  onChangeHandler: (a: InputOptions | null) => void;
}

const InputField = ({
  id = "input-field",
  options = [],
  selected,
  onChangeHandler,
}: TypeProps) => {
  const [opts, setOpts] = useState(options);

  const onChange: TextFieldProps["onChange"] = (e) => {};
  const onSelect = (e: any, val: InputOptions | null) => {
    onChangeHandler(val);
  };
  const onFilterOption = (
    optList: Array<InputOptions>,
    params: FilterOptionsState<InputOptions>
  ) => {
    const filtered = filter(optList, params);

    const { inputValue } = params;
    const isExisting = optList.some((o) => o.label === inputValue);
    if (inputValue != "" && !isExisting) {
      filtered.unshift({
        inputValue,
        label: `"${inputValue}" 추가`,
      });
    }

    return filtered;
  };

  const getOptionLabel = (opt: any) => {
    if (typeof opt === "string") {
      return opt;
    } else if (opt && opt.inputValue) {
      return opt.inputValue;
    } else {
      return opt?.label;
    }
  };

  useEffect(() => {
    setOpts(options);
  }, [options]);

  return (
    <Box
      sx={{
        p: "0.25em",
        m: 0,
        width: "90%",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Autocomplete
        id={id}
        value={selected}
        freeSolo
        handleHomeEndKeys
        noOptionsText={"텅"}
        options={opts}
        onChange={onSelect}
        filterOptions={onFilterOption}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => <TextField {...params} label="재료" />}
        sx={{ width: 200, display: "inline-block", marginRight: ".5em" }}
        selectOnFocus
        clearOnBlur
        disablePortal
      />
      <TextField
        id={`amount-${id}`}
        label="수량"
        color="secondary"
        sx={{ width: 300 }}
        defaultValue={selected?.value}
        onChange={onChange}
        focused
      />
      <IconButton>
        {selected ? <CancelSharpIcon /> : <AddCircleIcon color="secondary" />}
      </IconButton>
    </Box>
  );
};

export default InputField;
