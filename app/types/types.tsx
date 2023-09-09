export type MenuItem = {
  Menu_Name: string;
  Menu_Display: string;
  Menu_Value: string;
  Menu_DependantMenu: string | string[];
  Menu_DependantValue: string | string[];
  Menu_Order: string;
};

export interface FormProps {
  formTitle: string;
  defaultValues: any;
  menuItems: MenuItem[];
}
