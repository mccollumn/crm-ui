import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const FormDatePicker = ({
  label,
  value = null,
  onChange,
  ...props
}: FormDatePicker) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        slotProps={{ textField: { size: "small" } }}
        onChange={onChange}
        {...props}
      />
    </LocalizationProvider>
  );
};

interface FormDatePicker {
  /**
   * Label displayed in the UI
   */
  label: string;
  /**
   * Default date
   */
  value?: Date | null;
  /**
   * Is this field required?
   */
  required?: boolean;
  /**
   * onChange event handler
   */
  onChange: (value: any) => void;
}
