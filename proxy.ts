import {
  NextResponse,
} from "next/server";

import {
  auth,
} from "./auth";

export default auth(
  (request) => {
    const isLoggedIn =
      Boolean(
        request.auth,
      );

    const {
      pathname,
    } = request.nextUrl;

    const isDashboardRoute =
      pathname.startsWith(
        "/dashboard",
      );

    if (
      isDashboardRoute &&
      !isLoggedIn
    ) {
      const loginUrl =
        new URL(
          "/login",
          request.nextUrl.origin,
        );

      loginUrl.searchParams.set(
        "callbackUrl",
        request.nextUrl.href,
      );

      return NextResponse.redirect(
        loginUrl,
      );
    }

    return NextResponse.next();
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};