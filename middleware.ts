import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VARIANT_COOKIE = "tmi_ab_testing_variant";
const BASIC_AUTH_USERNAME = "admin";
const BASIC_AUTH_PASSWORD = "admin";

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="The Modern Internet", charset="UTF-8"',
    },
  });
}

function isAuthorized(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  try {
    const encoded = authorization.slice("Basic ".length);
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return false;
    }

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    return (
      username === BASIC_AUTH_USERNAME && password === BASIC_AUTH_PASSWORD
    );
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/basic-auth") {
    if (!isAuthorized(request)) {
      return unauthorizedResponse();
    }

    return NextResponse.next();
  }

  if (request.nextUrl.pathname !== "/ab-testing") {
    return NextResponse.next();
  }

  const existingVariant = request.cookies.get(VARIANT_COOKIE)?.value;

  if (existingVariant === "control" || existingVariant === "variation") {
    return NextResponse.next();
  }

  const variant = Math.random() < 0.5 ? "control" : "variation";
  const response = NextResponse.next();

  response.cookies.set({
    name: VARIANT_COOKIE,
    value: variant,
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/ab-testing", "/basic-auth"],
};
