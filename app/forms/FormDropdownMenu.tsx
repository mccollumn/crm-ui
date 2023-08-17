import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import { SyntheticEvent } from "react";

export const FormDropdownMenu = ({
  label,
  id,
  value = [],
  onChange,
  options,
  required = false,
  multiple = false,
  ...props
}: FormDropdownMenuProps) => {
  return (
    <Autocomplete
      size="small"
      options={options}
      // value={value}
      defaultValue={value}
      multiple={multiple}
      renderInput={(params) => (
        <TextField {...params} label={label} id={id} required={required} />
      )}
      onChange={onChange}
      {...props}
    />
  );
};

interface FormDropdownMenuProps {
  /**
   * Label displayed in the UI
   */
  label: string;
  /**
   * Element ID
   */
  id?: string;
  /**
   * Default value. Must match one of the options.
   */
  value?: string | string[];
  /**
   * onChange event handler
   */
  // onChange: (event: any, value: string | null) => void;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: string | string[] | null
  ) => void;
  /**
   * Is this field required?
   */
  required?: boolean;
  /**
   * Can multiple values be selected
   */
  multiple?: boolean;
  /**
   * Menu options as array of strings
   */
  options: string[];
}
