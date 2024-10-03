import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from "@/lib/connectDB";

export async function PUT(request) {
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    
    const updateData = await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized: Please log in" }), { status: 401 });
    }

    const { email } = session.user;

    // Dynamically build the update fields
    const updatedFields = {};
    if (updateData.username) updatedFields.username = updateData.username;
  // profile
    if (updateData["profile.firstName"]) updatedFields["profile.firstName"] = updateData["profile.firstName"];
    if (updateData["profile.lastName"]) updatedFields["profile.lastName"] = updateData["profile.lastName"];
    if (updateData["profile.bio"]) updatedFields["profile.bio"] = updateData["profile.bio"];
    if (updateData["profile.avatarUrl"]) updatedFields["profile.avatarUrl"] = updateData["profile.avatarUrl"];
    if (updateData["profile.phone"]) updatedFields["profile.phone"] = updateData["profile.phone"];
//   address 
    if (updateData["profile.address.street"]) updatedFields["profile.address.street"] = updateData["profile.address.street"];
    if (updateData["profile.address.city"]) updatedFields["profile.address.city"] = updateData["profile.address.city"];
    if (updateData["profile.address.state"]) updatedFields["profile.address.state"] = updateData["profile.address.state"];
    if (updateData["profile.address.zipCode"]) updatedFields["profile.address.zipCode"] = updateData["profile.address.zipCode"];
    if (updateData["profile.address.country"]) updatedFields["profile.address.country"] = updateData["profile.address.country"];
    
    if (updateData["profile.skills"]) updatedFields["profile.skills"] = updateData["profile.skills"];
    if (updateData["profile.socialLinks"]) updatedFields["profile.socialLinks"] = updateData["profile.socialLinks"];
    if (updateData["profile.services"]) updatedFields["profile.services"] = updateData["profile.services"]

    // Update the user's profile in the database
    const updateResult = await userCollection.updateOne(
      { email },                  // Match the logged-in user's email
      { $set: updatedFields }      // Set the fields dynamically
    );

    if (updateResult.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const updatedUser = await userCollection.findOne({ email });
    return new Response(JSON.stringify({ message: "Profile updated successfully", user: updatedUser }), { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
