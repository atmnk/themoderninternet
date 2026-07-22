import { NextResponse } from "next/server";

const VARIANT_COOKIE = "tmi_ab_testing_variant";

export function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/ab-testing", request.url));

  response.cookies.delete(VARIANT_COOKIE);

  return response;
}
