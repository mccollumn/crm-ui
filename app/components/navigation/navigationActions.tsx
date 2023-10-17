import { Home } from "@mui/icons-material";
import SearchInput from "./SearchInput";
import AccountMenu from "./AccountMenu";
import ContactsIcon from "@mui/icons-material/Contacts";
import GroupIcon from "@mui/icons-material/Group";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export const navigationActions: NavigationAction[] = [
  // TODO: Reenable once search API and results page are ready
  // {
  //   key: "Search",
  //   label: "Search",
  //   ariaLabel: "Search",
  //   authFilter: "authorized",
  //   position: "top",
  //   Component: (
  //     <SearchInput
  //       searchHandler={() => console.log("Search")}
  //       label="Search"
  //       variant="outlined"
  //     />
  //   ),
  //   snapPosition: "right",
  // },
  {
    key: "AccountMenu",
    label: "Account Menu",
    ariaLabel: "AccountMenu",
    authFilter: "always",
    position: "top",
    snapPosition: "right",
    Component: <AccountMenu />,
  },
  {
    key: "Home",
    label: "Home",
    icon: <Home />,
    ariaLabel: "Home",
    path: "/",
    authFilter: "always",
    position: "left",
  },
  {
    divider: true,
    authFilter: "always",
    position: "left",
  },
  {
    key: "Cases",
    label: "Cases",
    icon: <ContactSupportIcon />,
    ariaLabel: "Cases",
    path: "/cases",
    authFilter: "authorized",
    position: "left",
  },
  {
    key: "Accounts",
    label: "Accounts",
    icon: <GroupIcon />,
    ariaLabel: "Accounts",
    path: "/accounts",
    authFilter: "authorized",
    position: "left",
  },
  {
    key: "Contacts",
    label: "Contacts",
    icon: <ContactsIcon />,
    ariaLabel: "Contacts",
    path: "/contacts",
    authFilter: "authorized",
    position: "left",
  },
  {
    key: "Opportunities",
    label: "Opportunities",
    icon: <MonetizationOnIcon />,
    ariaLabel: "Opportunities",
    path: "/opportunities",
    authFilter: "authorized",
    position: "left",
  },
];

export interface NavigationAction {
  key?: string;
  /**
   * Display actions on authorization state
   * always: Always show regardless of auth status
   * authorized: Only show when user is authorized
   * unauthorized: Only show when user is not authorized
   */
  authFilter: "always" | "authorized" | "unauthorized";
  /**
   * Display text to the user
   */
  label?: string;
  /**
   * Aria text
   */
  ariaLabel?: string;
  /**
   * MUI Icon to display
   */
  icon?: React.ReactElement | null;
  /**
   * Display a divider in navigation
   */
  divider?: Boolean;
  /**
   * Path to redirect to on nav click
   */
  path?: string;
  /**
   * Define which navigation area to display the action
   * left: Left navigation drawer
   * top: Top app navigation
   */
  position: "left" | "top";
  /**
   * Render custom nav component
   */
  Component?: React.ReactElement | null;
  /**
   * Snap custom component to position in app bar
   */
  snapPosition?: "left" | "center" | "right";
}
