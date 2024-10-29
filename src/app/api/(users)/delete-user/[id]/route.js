import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export const DELETE = async (request, { params }) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    
    if (!params.id) {
      return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
    }

   
    const resp = await userCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    if (resp.deletedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully", response: resp }, { status: 200 });
  } catch (error) {
    console.error("Error during user deletion:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
