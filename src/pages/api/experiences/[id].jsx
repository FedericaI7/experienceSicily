import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("final-project");

      if (!req.query.id) {
        return res.status(400).json({ error: "ID is required" });
      }

      // Converti l'ID da stringa ad ObjectId per la query
      const id = new ObjectId(req.query.id);
      const data = await db.collection("experiences").findOne({ _id: id });

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
