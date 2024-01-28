import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers/providers";
import NavigationMenu from "./components/navigation/NavigationMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM",
  description: "Customer relationship management",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={inter.className}>
        <Providers>
          <NavigationMenu isAuthorized={true}>{children}</NavigationMenu>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
