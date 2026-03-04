import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const username = request.cookies.get("username");

  if (!username) {
    return NextResponse.redirect(new URL("/enter-username", request.url));
  }
}

export const config = {
  matcher: [
    /*
     Match all paths except:
     - /enter-username
     - /api
     - /_next
     - static files
    */
    "/((?!enter-username|api|_next|.*\\..*).*)",
  ],
};
