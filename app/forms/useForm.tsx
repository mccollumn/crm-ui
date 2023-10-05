import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { MenuItem } from "../types/types";

export const useForm = ({ menuItems, initialMenuOptions }: UseFormProps) => {
  const [options, setOptions] = React.useState<any>(initialMenuOptions);
  const [isLoading, setIsLoading] = React.useState(false);

  const getMenuOptions = React.useCallback(
    (menu: string, dependentValue: string = "") => {
      const optionObjs = menuItems.filter((item: MenuItem) => {
        if (Array.isArray(item.Menu_DependantValue)) {
          return (
            item.Menu_Name === menu &&
            item.Menu_DependantValue.includes(dependentValue)
          );
        } else {
          return (
            item.Menu_Name === menu &&
            item.Menu_DependantValue === dependentValue
          );
        }
      });
      return optionObjs.map((item: MenuItem) => item.Menu_Display);
    },
    [menuItems]
  );

  /**
   * Sets the options for the provided menu name with the specified dependent value.
   * The dependent value can be a string or array of strings.
   */
  const setMenuOptions = React.useCallback(
    (menu: string, dependentValue: string = "") => {
      const optionsArray = getMenuOptions(menu, dependentValue);
      setOptions((prev: any) => {
        return { ...prev, [menu]: optionsArray };
      });
      return optionsArray;
    },
    [getMenuOptions]
  );

  /**
   * Appends the options, preserving any existing options,
   * for the provided menu name with the specified dependent value.
   * The dependent value can be a string or array of strings.
   */
  const appendMenuOptions = React.useCallback(
    (menu: string, dependentValue: string = "") => {
      const optionsArray = getMenuOptions(menu, dependentValue);
      setOptions((prev: any) => {
        return { ...prev, [menu]: [...prev[menu], ...optionsArray] };
      });
      return optionsArray;
    },
    [getMenuOptions]
  );

  /**
   * Sets the provided options for the specified menu.
   */
  const setCustomMenuOptions = React.useCallback(
    (menu: string, optionsArray: any[]) => {
      setOptions((prev: any) => {
        return { ...prev, [menu]: optionsArray };
      });
      return optionsArray;
    },
    []
  );

  /**
   * Custom inputComponent that formats the input value as currency (USD).
   */
  const FormatCurrency = React.forwardRef<NumericFormatProps, CustomInputProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;

      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          valueIsNumericString
          prefix="$"
        />
      );
    }
  );

  /**
   * Custom inputComponent that formats the input value as a percantage.
   */
  const FormatPercent = React.forwardRef<NumericFormatProps, CustomInputProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;

      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          valueIsNumericString
          suffix="%"
        />
      );
    }
  );

  /**
   * Custom inputComponent that formats the input value as a number.
   */
  const FormatNumber = React.forwardRef<NumericFormatProps, CustomInputProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;

      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          valueIsNumericString
        />
      );
    }
  );

  return {
    setMenuOptions,
    setCustomMenuOptions,
    appendMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions: options,
    FormatCurrency,
    FormatPercent,
    FormatNumber,
  };
};

interface CustomInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface UseFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
  /**
   * Initial menu options used to populate a new form.
   */
  initialMenuOptions?: any;
}
