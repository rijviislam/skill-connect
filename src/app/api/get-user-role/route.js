import { getToken } from "next-auth/jwt";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_AUTH_SECRET });

  if (!token) {
 
    return new Response(JSON.stringify({ error: "Unauthorized - No valid session token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let userRole;

  if (token.role === "client") {
    userRole = "client";
  } else if (token.role === "freelancer") {
    userRole = "freelancer";
  } else if (token.role === "admin") {
    userRole = "admin";
  } else {
    return new Response(JSON.stringify({ error: "Forbidden - Invalid role" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ role: userRole }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}