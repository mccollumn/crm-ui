import { Checkbox, FormControlLabel } from "@mui/material";

export const FormCheckbox = ({
  label,
  id,
  onChange,
  required = false,
  ...props
}: FormCheckboxProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox id={id} onChange={onChange} required={required} {...props} />
      }
      label={label}
    />
  );
};

interface FormCheckboxProps {
  /**
   * Label displayed in the UI
   */
  label: string;
  /**
   * Element ID
   */
  id?: string;
  /**
   * Is box checked?
   */
  checked?: boolean;
  /**
   * onChange event handler
   */
  onChange: (event: any) => void;
  /**
   * Is this field required?
   */
  required?: boolean;
}
