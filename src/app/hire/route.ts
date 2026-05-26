import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/contact";
  url.searchParams.set("mode", "blueprint");
  return NextResponse.redirect(url, 308);
}
