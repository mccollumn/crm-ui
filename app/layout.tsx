"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

import React from "react";
import {
  navigationActions,
  NavigationAction,
} from "./navigation/navigationActions";
import { TopNavBar } from "./navigation/TopNavBar";
import { LeftNavDrawer } from "./navigation/LeftNavDrawer";
import { filterNavigationActions } from "./navigation/navigation.util";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webtrends CRM",
  description: "Generated by create next app",
};

const Layout = ({
  label,
  // navigationActions = [],
  // navigationClick = () => {},
  topNavHeight = 64,
  leftNavMinWidth = 64,
  leftNavMaxWidth = 240,
  isAuthorized,
  children,
}: LayoutProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedNav, setSelectedNav]: any = React.useState();

  const router = useRouter();

  const expandNav = () => setOpen(true);
  const collapseNav = () => setOpen(false);

  const navClickHandler = (action: NavigationAction) => {
    setSelectedNav(action);
    // navigationClick(action);
    router.push(action.path || "");
  };

  const { topNavActions, leftNavActions, leftNavCount } = getNavigationActions(
    navigationActions,
    // isAuthorized
    true
  );

  let baseClassNames = ["base-application"];
  baseClassNames.push(open ? "expanded" : "contracted");

  return (
    <html>
      <body className={inter.className}>
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
              marginLeft: open
                ? `${leftNavMaxWidth}px`
                : `${leftNavMinWidth}px`,
              width: "100%",
              height: "100%",
              padding: "24px",
            }}
          >
            {children}
          </Box>
        </Box>
      </body>
    </html>
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

interface LayoutProps {
  /**
     Title of application
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

export default Layout;
