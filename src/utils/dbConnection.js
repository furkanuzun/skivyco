import { MongoClient } from "mongodb";

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(
    // "mongodb+srv://furkanuzun:mongo8563M@cluster0.thdascn.mongodb.net/",
    "mongodb://root:filozof8563F@207.180.215.244:55000/?ssl=false",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  client.on("error", console.error.bind(console, "connection error: "));
  client.once("open", function () {});

  const db = client.db("skivy");

  cachedClient = {
    client,
    db,
  };

  return cachedClient;
}

export default connectToDatabase;
