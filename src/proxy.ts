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
     * Match all request paths except:
     * - /enter-username (username entry page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    "/((?!enter-username|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
