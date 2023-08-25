/**
 * Formats a date or date/time string as either UTC or the current locale.
 * @param dateString Date / time value.
 * @param locale Use current locale?
 * @returns String repesentation of the date / time.
 */
const formatDate = (
  dateString: string | null | undefined,
  locale: boolean = false
) => {
  if (locale) {
    return dateString ? new Date(dateString).toLocaleString() : "";
  }
  return dateString ? new Date(dateString).toString() : "";
};

export default formatDate;
