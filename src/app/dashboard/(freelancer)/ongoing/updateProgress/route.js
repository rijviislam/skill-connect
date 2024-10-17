import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const PATCH = async (request) => {
  const { id } = await request.json();
  const db = await connectDB();
  const jobCollection = db.collection("jobs");
  try {
    const prog = await jobCollection.findOne({_id: new ObjectId(id)});

    const result = await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ongoingWork: (prog.ongoingWork += 10),
        }
      },
      {
        upsert: true,
      }
    );
    return Response.json({ message: "Progress Updated", status:200 });
  } catch (error) {
    return Response.json({ message: "wrong from update progress api", error });
  }
};
