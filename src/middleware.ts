import { NextRequest } from "next/server";
import { updateSession } from "@/utils/Lib";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
