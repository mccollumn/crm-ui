import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const FormDatePicker = ({
  label,
  onChange,
  ...props
}: FormDatePicker) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
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
   * onChange event handler
   */
  onChange: (value: any) => void;
}
