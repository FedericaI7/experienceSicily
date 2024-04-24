import clientPromise from "../../../../utils/mongodb";

const client = await clientPromise;
const db = client.db("final-project");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const user = req.body;

      const result = await db.collection("users").insertOne(user);

      if (result.acknowledged) {
        res.status(201).json({ message: "User created" });
      } else {
        res.status(400).json({ error: "User not created" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
