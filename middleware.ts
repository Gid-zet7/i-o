export { default } from "next-auth/middleware";
import { NextRequest } from "next/server";

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};

const middleware = (reqeust: NextRequest) => {
  console.log(reqeust.url);
};
