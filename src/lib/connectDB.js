const { MongoClient, ServerApiVersion } = require('mongodb');
let db;

const connectDB =async () => {
    if(db) return db;
    try {
        
        const uri = process.env.NEXT_PUBLIC_MONGODB_URI
        if (!uri) {
            throw new Error("MongoDB URI is not defined in the environment variables.");
        }
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
        // await client.connect();
        console.log("mongodb connected")
    db = client.db("skill-connect")
    return db;
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
