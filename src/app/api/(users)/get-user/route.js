import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth/next";

export async function GET(request) {
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { email } = session.user;

    const user = await userCollection.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

