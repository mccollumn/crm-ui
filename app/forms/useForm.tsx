import React from "react";
import { MenuItem } from "../types/types";

export const useForm = ({ menuItems, initialMenuOptions }: UseFormProps) => {
  const [options, setOptions] = React.useState<any>(initialMenuOptions);

  /**
   * Sets the options for the provided menu name with the specified dependent value.
   * The dependent value can be a string or array of strings.
   */
  const setMenuOptions = React.useCallback(
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
      const optionsArray = optionObjs.map(
        (item: MenuItem) => item.Menu_Display
      );
      setOptions((prev: any) => {
        return { ...prev, [menu]: optionsArray };
      });
      return optionsArray;
    },
    [menuItems]
  );

  /**
   * Appends the options, preserving any existing options,
   * for the provided menu name with the specified dependent value.
   * The dependent value can be a string or array of strings.
   */
  const appendMenuOptions = React.useCallback(
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
      const optionsArray = optionObjs.map(
        (item: MenuItem) => item.Menu_Display
      );
      setOptions((prev: any) => {
        return { ...prev, [menu]: [...prev[menu], ...optionsArray] };
      });
      return optionsArray;
    },
    [menuItems]
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

  return {
    setMenuOptions,
    setCustomMenuOptions,
    appendMenuOptions,
    menuOptions: options,
  };
};

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
