/**
 * Replaces menu value strings in the case data with the corresponding menu item object.
 * @param menuItems Form menu items object
 * @param data Form data
 */
export const updateMenuValues = (menuItems: any, data: any) => {
  Object.keys(menuItems).forEach((menuName: string) => {
    const section = menuItems[menuName].sectionKey;
    const menu = menuItems[menuName].menuKey;

    if (!data[section][menu]) return;
    const menuValue = menuItems[menuName].options.find(
      (item: any) => item.Menu_Value === data[section][menu]
    );

    // If the existing data value matches one of the menu options, then use that option
    if (menuValue) {
      data[section][menu] = menuValue;
      return;
    }
    // If the existing data value does not match one of the menu options, then create a new option object
    data[section][menu] = {
      Menu_Name: menuName,
      Menu_Display: data[section][menu],
      Menu_Value: data[section][menu],
    };
  });
};

/**
 * Returns the input element name for the specified menu
 * @param menuItems Form menu items object
 * @param menuName Menu name as specified in the menuItems object
 */
export const getInputName = (
  menuItems: { [key: string]: any },
  menuName: string
) => {
  return `${menuItems[menuName].sectionKey}.${menuItems[menuName].menuKey}`;
};
