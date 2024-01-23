"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { navigationActions, NavigationAction } from "./navigationActions";
import { TopNavBar } from "./TopNavBar";
import { LeftNavDrawer } from "./LeftNavDrawer";
import { filterNavigationActions } from "./navigation.util";
import { Box } from "@mui/material";

const NavigationMenu = ({
  label,
  topNavHeight = 64,
  leftNavMinWidth = 64,
  leftNavMaxWidth = 240,
  isAuthorized,
  children,
}: NavigationMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedNav, setSelectedNav]: any = React.useState();

  const router = useRouter();

  const expandNav = () => setOpen(true);
  const collapseNav = () => setOpen(false);

  const navClickHandler = (action: NavigationAction) => {
    setSelectedNav(action);
    router.push(action.path || "");
  };

  const { topNavActions, leftNavActions, leftNavCount } = getNavigationActions(
    navigationActions,
    true
  );

  let baseClassNames = ["base-application"];
  baseClassNames.push(open ? "expanded" : "contracted");

  return (
    <Box
      className={baseClassNames.join(" ")}
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
      aria-label="Base application"
    >
      <TopNavBar
        isAuthorized={isAuthorized}
        topNavActions={topNavActions}
        navClickHandler={navClickHandler}
        selectedNav={selectedNav}
        label={label}
        expandNav={expandNav}
        open={open}
        showMenu={!!leftNavCount}
        topNavHeight={topNavHeight}
        maxWidth={leftNavMaxWidth}
      />

      <LeftNavDrawer
        isAuthorized={true}
        leftNavigationActions={leftNavActions}
        leftNavigationClick={navClickHandler}
        selectedNav={selectedNav}
        open={open}
        showDrawer={!!leftNavCount}
        collapseNav={collapseNav}
        minWidth={leftNavMinWidth}
        maxWidth={leftNavMaxWidth}
        topNavHeight={topNavHeight}
      />

      <Box
        className={"base-page-container"}
        sx={{
          marginTop: `${topNavHeight}px`,
          marginLeft: open ? `${leftNavMaxWidth}px` : `${leftNavMinWidth}px`,
          // TODO: Update width to work with Firefox
          width: "-webkit-fill-available",
          // width: "-moz-available",
          // width: "100%",
          height: "100%",
          padding: "24px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const getNavigationActions = (
  navigationActions: Array<NavigationAction>,
  isAuthorized: boolean
) => {
  const topNavActions = navigationActions
    .filter((a: NavigationAction) => a.position === "top")
    .filter((a: NavigationAction) => {
      return filterNavigationActions({
        action: a,
        isAuthorized,
      });
    });

  const leftNavActions = navigationActions
    .filter((a: NavigationAction) => a.position !== "top")
    .filter((a: NavigationAction) => {
      return filterNavigationActions({
        action: a,
        isAuthorized,
      });
    });

  return {
    topNavActions,
    leftNavActions,
    // Filter any dividers
    leftNavCount: leftNavActions.filter((a: NavigationAction) => !a.divider)
      .length,
  };
};

interface NavigationMenuProps {
  /**
   * Title of application
   */
  label?: string;
  /**
   * List of all navigation actions in left navigation and app bar
   */
  navigationActions?: Array<NavigationAction>;
  /**
   * Current user authorized status
   */
  isAuthorized: boolean;
  /**
   * Event when navigation is clicked, returns navigation item
   */
  navigationClick?: Function;
  /**
   * Top navigation bar height
   */
  topNavHeight?: number;
  /**
   * Left navigation drawer collapsed width
   */
  leftNavMinWidth?: number;
  /**
   * Left navigation drawer expanded width
   */
  leftNavMaxWidth?: number;
  /**
   * All child elements
   */
  children?: React.ReactNode;
}

export default NavigationMenu;
