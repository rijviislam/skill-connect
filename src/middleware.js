import { NextResponse } from "next/server";


async function fetchUserRole(authToken) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_URL}/api/get-user-role`, 
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch user role, status:", response.status);
      throw new Error("Failed to fetch user role");
    }

    const data = await response.json();
    console.log("User role fetched:", data.role);
    return data.role;
  } catch (error) {
    console.error("Error in fetchUserRole:", error);
    return null;
  }
}

export async function middleware(request) {
  console.log("Middleware is Running");


  const authToken = request.cookies.get("next-auth.session-token")?.value;
  const pathname = request.nextUrl.pathname;

  console.log("Auth Token:", authToken);

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

  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  if (!authToken && isAuthPage) {
    return NextResponse.next();
  }

  const userRole = authToken ? await fetchUserRole(authToken) : null;

  console.log("User Role:", userRole);

  if (userRole === "client" && clientOnlyRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  
  if (userRole === "freelancer" && freelancerOnlyRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (userRole === "admin" && adminOnlyRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  console.log("Redirecting to home due to unauthorized access");
  return NextResponse.redirect(new URL("/", request.url));
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