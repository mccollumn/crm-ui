import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { numericFormatter } from "react-number-format";
import { add } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const isObjectEmpty = (objectName: any) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

export const isSuccessfulResponse = async (response: Response) => {
  if (!response.ok) {
    console.error("Unable to submit data:", response.statusText);
    return false;
  }
  return true;
};

/**
 * Generates a date object with the correct time zone.
 * @param date Date / time string.
 * @returns Date object.
 */
export const getZonedDate = (date: string) => {
  const isZonedRegex = /:\d+\.?\d+[Z$|\-|\+]/g;
  const isZoned = !!date.match(isZonedRegex);
  // Many date strings have no time zone and are assumed to be UTC.
  // Add the Z zone designator in these cases.
  if (!isZoned) {
    date = `${date}Z`;
  }
  return new Date(date);
};

/**
 * Formats a date or date/time string.
 * @param dateString Date / time value.
 * @param locale Use current locale? Default true.
 * @param time Should the time be included? Default false.
 * @returns String repesentation of the date / time.
 */
export const formatDate = (
  dateString: string | null | undefined,
  props?: { locale?: boolean; time?: boolean }
) => {
  if (!dateString) return dateString;
  const locale = typeof props?.locale === "undefined" ? true : props?.locale;
  const time = props?.time;
  const timeZone = process.env.NEXT_PUBLIC_TIME_ZONE || "Etc/UTC";
  const zonedDate = utcToZonedTime(getZonedDate(dateString), timeZone);

  if (locale) {
    return time ? zonedDate.toLocaleString() : zonedDate.toLocaleDateString();
  }
  return time ? zonedDate.toString() : zonedDate.toDateString();
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

/**
 * Formats a percentage for display.
 * @param value The number to format.
 * @returns Formatted string.
 */
export const formatPercent = (value: number | string | null | undefined) => {
  if (!value) return value;
  return numericFormatter(value.toString(), {
    thousandSeparator: true,
    suffix: "%",
  });
};

/**
 * Escapes an HTML string.
 * @param str String containing special characters.
 * @returns String with HTMl escaped characters.
 */
export const htmlEscape = (str: string) => {
  if (!str) return str;
  return str.replaceAll("'", "&#39;");
};

/**
 * Unescapes an HTML string.
 * @param str String containing HTML escaped characters.
 * @returns String with characters unescaped.
 */
export const unEscape = (str: string | null | undefined) => {
  if (!str) return str;
  return str
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
};

/**
 * Converts a date to an ISO formatted string.
 * @param date Date object or date string.
 * @returns ISO formatted date string.
 */
export const convertDateToISOString = (date: Date | null | undefined) => {
  if (!date) return date;
  return new Date(date).toISOString();
};

/**
 * Converts a boolean to a string.
 * @param bool Boolean value.
 * @returns String with value of either "0" or "1".
 */
export const convertBooleanToString = (
  bool: boolean | string | null | undefined
) => {
  if (bool === null) return "0";
  if (bool === "0") return "0";
  return bool ? "1" : "0";
};

/**
 * Converts a number to a string.
 * @param number Number to convert to string.
 * @returns String containing the number.
 */
export const convertNumberToString = (number: number | null | undefined) => {
  if (number) return String(number);
  return null;
};

/**
 * Converts a delimited string into an array.
 * @param str String to convert to array.
 * @param delimiter Delimiter used to split the string. Default semicolon.
 * @returns Array of strings.
 */
export const convertStringToArray = (
  str: string | null | undefined,
  delimiter: string = ";"
) => {
  if (!str) return null;
  return str.split(delimiter);
};

/**
 * Converts an array of strings into a delimited string.
 * @param arr Array to convert to string.
 * @param delimiter Delimiter used in the output string. Default semicolon.
 * @returns String with all array values concatenated.
 */
export const convertArrayToString = (
  arr: string[] | null | undefined,
  delimiter: string = ";"
) => {
  if (!arr) return arr;
  return arr.join(delimiter);
};

/**
 * Appends a new value to a delimited string.
 * @param delimitedString String on which to append new value.
 * @param newString New string to be appended.
 * @param delimiter Delimiter used in the input and output strings. Default semicolon.
 * @returns String with all values.
 */
export const appendToDelimitedString = (
  delimitedString: string | null | undefined,
  newString: string | null | undefined,
  delimiter: string = ";"
) => {
  if (!newString) return delimitedString;
  if (!delimitedString) return newString;
  const strArray = convertStringToArray(delimitedString, delimiter);
  strArray?.push(newString);
  return convertArrayToString(strArray);
};

/**
 * Returns an object with all keys with null values removed.
 * The object can have one level of nesting.
 * @param obj Object to iterate over.
 * @returns Object with no nulls.
 */
export const removeNullsFromObject = (obj: any) => {
  let result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      const subObj = obj[key];
      let subResult = {};
      Object.keys(subObj).forEach((subKey) => {
        if (subObj[subKey] !== null) {
          subResult = { ...subResult, [subKey]: subObj[subKey] };
        }
      });
      if (!isObjectEmpty(subResult)) {
        result = { ...result, [key]: { ...subResult } };
      }
    } else if (obj[key] !== null) {
      result = { ...result, [key]: obj[key] };
    }
  });
  return result;
};

/**
 * Returns an object that only contains the form values that changed.
 * @param formData Form data being submitted.
 * @param origData Data used to initially populate the form.
 * @returns Object with only values that were modified.
 */
export const getChangedValues = (formData: any, origData: any) => {
  if (!origData) return formData;
  let result = {};
  Object.keys(formData).forEach((key) => {
    // Don't touch SubmissionDetails
    if (key === "SubmissionDetails") {
      result = { ...result, [key]: formData[key] };
      return;
    }
    // Only include data that is different between formData and origData
    if (formData[key] && typeof formData[key] === "object") {
      const subObj = formData[key];
      let subResult = {};
      Object.keys(subObj).forEach((subKey) => {
        if (!origData[key] || subObj[subKey] !== origData[key][subKey]) {
          subResult = { ...subResult, [subKey]: subObj[subKey] };
        }
      });
      if (!isObjectEmpty(subResult)) {
        result = { ...result, [key]: { ...subResult } };
      }
    } else if (formData[key] !== origData[key]) {
      result = { ...result, [key]: formData[key] };
    }
  });
  return result;
};

/**
 * Increments the provided date by one year.
 * @param currentDateStr Date string.
 * @returns New date string.
 */
export const addYear = (currentDateStr: string | null) => {
  if (!currentDateStr) {
    return add(new Date(), { years: 1 }).toISOString();
  }
  return add(new Date(currentDateStr), { years: 1 }).toISOString();
};
