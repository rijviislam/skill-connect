import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    
    const db = await connectDB();
    const userCollection = db.collection("users");

    const { image, username, email, passwordHash, role } = await request.json();

    if (!username || !email || !passwordHash || !role) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const exist = await userCollection.findOne({ email: email });
    if (exist) {
      return Response.json({ message: "user Exists" }, { status: 500 });
    }

    const newUser = {
      username,
      email,
      passwordHash,
      role,
      profile: {
        firstName: "",
        lastName: "",
        bio: "",
        avatarUrl: image,
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: ""
        },
        socialLinks: [],
        skills: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      services: [],
      ratings: {
        totalRatings: 0,
        averageRating: 0
      },
      paymentInfo: {
        bankDetails: "",
        paymentMethods: []
      }
    };
 
     if (role === "freelancer") {
      newUser.hiredClients = [];
    } else if (role === "client") {
      newUser.hiredFreelancers = [];
    }

    const hashedPassword = bcrypt.hashSync(newUser.passwordHash, 14);
    const res = await userCollection.insertOne({
      ...newUser,
      passwordHash: hashedPassword,
    });

    return Response.json(
      { message: "new User created", data: res },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }),
    { status: 500 });
  }
}
