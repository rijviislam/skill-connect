import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from "@/lib/connectDB";

export async function GET(request) {
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    // Retrieve the session to get the logged-in user's email
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


// export async function PUT(request) {
//     try {
//       const db = await connectDB();
//       const userCollection = db.collection("users");

//       // Parse the incoming request body
//       const updateData = await request.json();
  
//       // Get the session to retrieve the logged-in user's email
//       const session = await getServerSession(authOptions);
//       if (!session) {
//         return new Response(JSON.stringify({ message: "Unauthorized: Please log in" }), { status: 401 });
//       }
  
//       // Get the logged-in user's email from the session
//       const { email } = session.user;
  
//       // Check if the request body is empty
//       if (!updateData || Object.keys(updateData).length === 0) {
//         return new Response(JSON.stringify({ message: "No data provided for update" }), { status: 400 });
//       }
  
//       // Validate specific fields if necessary, e.g., roles
//       if (updateData.role && session.user.role !== "admin") {
//         return new Response(JSON.stringify({ message: "Unauthorized: Only admins can change roles" }), { status: 403 });
//       }
  
//       // Dynamically create the `updatedFields` object based on incoming request data
//       const updatedFields = {};
//       for (const [key, value] of Object.entries(updateData)) {
//         if (value !== undefined && value !== null) {
//           updatedFields[key] = value;
//         }
//       }
  
//       // Update the user's data based on the email
//       const updateResult = await userCollection.updateOne(
//         { email },                  // Match the logged-in user's email
//         { $set: updatedFields }      // Set the fields dynamically
//       );
  
//       if (updateResult.matchedCount === 0) {
//         return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
//       }
  
//       // Fetch the updated user data for confirmation
//       const updatedUser = await userCollection.findOne({ email });
//       return new Response(JSON.stringify({ message: "User updated successfully", user: updatedUser }), { status: 200 });
//     } catch (error) {
//       console.error("Error updating user:", error);
//       return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
//     }
//   }