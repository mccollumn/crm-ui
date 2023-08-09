import { Autocomplete, TextField } from "@mui/material";

export const FormDropdownMenu = ({
  label,
  id,
  onChange,
  options,
  required = false,
  ...props
}: FormDropdownMenuProps) => {
  return (
    <Autocomplete
      size="small"
      options={options}
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
   * onChange event handler
   */
  onChange: (event: any, value: string | null) => void;
  /**
   * Is this field required?
   */
  required?: boolean;
  /**
   * Menu options as array of strings
   */
  options: string[];
}
