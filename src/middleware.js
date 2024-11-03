import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("Middleware is Running");

  const authToken = await getToken({ req, secret: process.env.NEXT_PUBLIC_AUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  console.log("Middleware is Running in Production");
  console.log("Auth Token in Production:", authToken);

  // Check if authToken exists and directly use role if available
  const userRole = authToken?.role || null;
  console.log("User Role from Token:", userRole);

  const clientOnlyRoutes = [
    "/dashboard/job",
    "/dashboard/posted-job-client",
    "/dashboard/manageJobs",
    "/dashboard/services",
    "/dashboard/payment-management",
  ];
  const freelancerOnlyRoutes = [
    "/dashboard/ongoing",
    "/dashboard/myServices",
  ];
  const adminOnlyRoutes = [
    "/dashboard/report",
    "/dashboard/user",
  ];

  const isAuthPage = ["/api/auth/signin", "/api/auth/signup"].includes(pathname);

  // Redirect authenticated users trying to access auth pages
  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow unauthenticated users to access auth pages
  if (!authToken && isAuthPage) {
    return NextResponse.next();
  }

  // Role-based access control based on token's role
  if (
    (userRole === "client" && clientOnlyRoutes.includes(pathname)) ||
    (userRole === "freelancer" && freelancerOnlyRoutes.includes(pathname)) ||
    (userRole === "admin" && adminOnlyRoutes.includes(pathname))
  ) {
    return NextResponse.next();
  }

  // If user role does not match or is null, redirect to home
  console.log("Redirecting to home due to unauthorized access");
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: [
    "/api/auth/signin",
    "/api/auth/signup",
    "/dashboard/user",
    "/dashboard/job",
    "/dashboard/posted-job-client",
    "/dashboard/manageJobs",
    "/dashboard/services",
    "/dashboard/payment-management",
    "/dashboard/ongoing",
    "/dashboard/myServices",
    "/dashboard/report",
  ],
};

