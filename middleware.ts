export { default } from "next-auth/middleware";
export const config = {
  // Match all paths except for API routes
  matcher: ["/((?![^/]*/api).*)"],
};
