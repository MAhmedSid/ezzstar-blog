import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  // Use the default runtime instead of the edge runtime
  // runtime: 'nodejs',
  matcher: ['/account/:path*'],

}

// A custom middleware function that checks if the user is logged in
// and redirects them from certain URLs to the home page
export async function middleware(req: NextRequest) {
  // Create a supabase client with the request and response objects
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Get the current session object
  const session = await supabase.auth.getSession();

  // Get the current URL path
  const path = req.nextUrl.pathname;

  // Define an array of URLs to redirect from
  const redirectPaths = [
    "/auth/callback",
    "/account/signin",
    "/account/signup",
  ];

  // Define an array of URLs to exclude from redirection
  const excludePaths = ["/account/setting"];

  // Check if the session is active and the user is logged in
  if (session.data.session) {
    // Check if the current path matches any of the redirect paths
    // or starts with any of them (for nested paths)
    const shouldRedirect = redirectPaths.some(
      (redirectPath) =>
        path === redirectPath || path.startsWith(redirectPath + "/"),
    );

    // Check if the current path matches any of the exclude paths
    // or starts with any of them (for nested paths)
    const shouldExclude = excludePaths.some(
      (excludePath) =>
        path === excludePath || path.startsWith(excludePath + "/"),
    );

    // If the current path should be redirected and not excluded, rewrite the URL to the home page
    if (shouldRedirect && !shouldExclude) {
      // Clone the nextUrl object and modify the pathname property
      const url = req.nextUrl.clone();
      url.pathname = "/";

      // Use NextResponse.rewrite() as a static method and return the result
      return NextResponse.rewrite(url);
    }
  } else {
    // Check if the current path matches any of the exclude paths
    // or starts with any of them (for nested paths)
    const shouldRedirect = excludePaths.some(
      (excludePath) =>
        path === excludePath || path.startsWith(excludePath + "/"),
    );

    // If the current path should be redirected, rewrite the URL to the home page
    if (shouldRedirect) {
      // Clone the nextUrl object and modify the pathname property
      const url = req.nextUrl.clone();
      url.pathname = "/";

      // Use NextResponse.rewrite() as a static method and return the result
      return NextResponse.rewrite(url);
    }
  }

  // If none of the above conditions are met, return null to continue with the normal request handling
  return null;
}
