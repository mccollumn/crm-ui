import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import DateFnsProvider from "../providers/DateFnsProvider";

export const FormDatePicker = ({
  label,
  value = null,
  onChange,
  ...props
}: FormDatePicker) => {
  return (
    <DateFnsProvider>
      <DatePicker
        label={label}
        value={value}
        slotProps={{ textField: { size: "small" } }}
        onChange={onChange}
        {...props}
      />
    </DateFnsProvider>
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
