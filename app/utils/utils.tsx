import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { numericFormatter } from "react-number-format";

export const isObjectEmpty = (objectName: any) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

/**
 * Formats a date or date/time string as either UTC or the current locale.
 * @param dateString Date / time value.
 * @param locale Use current locale?
 * @param time Should the time be included?
 * @returns String repesentation of the date / time.
 */
export const formatDate = (
  dateString: string | null | undefined,
  props?: { locale?: boolean; time?: boolean }
) => {
  if (!dateString) return dateString;
  const locale = props?.locale;
  const time = props?.time;
  if (locale) {
    return time
      ? new Date(dateString).toLocaleString()
      : new Date(dateString).toLocaleDateString();
  }
  return time
    ? new Date(dateString).toString()
    : new Date(dateString).toDateString();
};

/**
 * Formats a number as currency.
 * Default is USD.
 * @param value The number to format.
 * @param locale Locale string (e.g. "en-US").
 * @param currency Currency string (e.g. "USD").
 * @returns Formatted string.
 */
export const formatCurrency = (
  value: number | string | null | undefined,
  locale: string = "en-US",
  currency: string = "USD"
) => {
  if (!value || isNaN(Number(value))) return value;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(Number(value));
};

/**
 * Formats value as a checkbox.
 * @param value Value used to determine if the box is checked.
 * @returns Checkbox component.
 */
export const formatCheckbox = (
  value: number | string | boolean | null | undefined
) => {
  return !!Number(value) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />;
};

/**
 * Formats a number for display.
 * @param value The number to format.
 * @returns Formatted string.
 */
export const formatNumber = (value: number | string | null | undefined) => {
  if (!value) return value;
  return numericFormatter(value.toString(), { thousandSeparator: true });
};
