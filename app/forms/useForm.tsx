import React from "react";
import { MenuItem } from "../types/types";

export const useForm = ({ menuItems, initialMenuOptions }: UseFormProps) => {
  const [options, setOptions] = React.useState<any>(initialMenuOptions);

  const setMenuOptions = React.useCallback(
    (menu: string, dependantValue: string = "") => {
      const optionObjs = menuItems.filter(
        (item: MenuItem) =>
          item.Menu_Name === menu && item.Menu_DependantValue === dependantValue
      );
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
