import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const PATCH = async (request, { params }) => {
  const data = await request.json();
  const db = await connectDB();
  const jobCollection = db.collection("jobs");
  try {
    const res = await jobCollection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...data,
        },
      },
      {
        upsert: true,
      }
    );
    return Response.json({ message: "hired freelancer" });
  } catch (error) {
    Response.json({ message: "wrong from hired job client" });
  }
};

