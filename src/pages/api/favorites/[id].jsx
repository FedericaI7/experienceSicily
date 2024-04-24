import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/mongodb";

const client = await clientPromise;
const db = client.db("final-project");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      if (!req.query.id) {
        return res.status(400).json({ error: "ID is required" });
      }
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(req.query.id) });
      const favorites = user.favorites;

      const data = [];

      for (let i = 0; i < favorites.length; i++) {
        const favorite = await db
          .collection("experiences")
          .findOne({ _id: new ObjectId(favorites[i]) });
        data.push(favorite);
      }

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const favorite = req.body;
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.query.id) });
    if (user.favorites.includes(favorite.id)) {
      user.favorites = user.favorites.filter((id) => id !== favorite.id);
    } else {
      user.favorites.push(favorite.id);
    }
    const result = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(req.query.id) },
        { $set: { favorites: user.favorites } }
      );
    if (result.acknowledged) {
      res.status(201).json({ message: "Favorite added" });
    } else {
      res.status(400).json({ error: "Favorite not added" });
    }
  }
}
