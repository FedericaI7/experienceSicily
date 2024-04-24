import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("final-project");
  if (req.method === "GET") {
    try {
      if (!req.query.id) {
        return res.status(400).json({ error: "ID is required" });
      }

      // Converti l'ID da stringa ad ObjectId per la query
      // const userId = new ObjectId(req.query.id);
      const reservations = await db
        .collection("reservations")
        .find({ userId: req.query.id })
        .toArray();

      const experiencesIds = reservations.map(
        (reservation) => reservation.experienceId
      );

      let experiences = [];

      for (let i = 0; i < experiencesIds.length; i++) {
        const experience = await db.collection("experiences").findOne({
          _id: new ObjectId(experiencesIds[i]),
        });
        experiences.push(experience);
      }

      for (let i = 0; i < experiences.length; i++) {
        reservations[i].experience = experiences[i];
      }

      if (reservations) {
        res.status(200).json(reservations);
      } else {
        res.status(404).json({ error: "Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const reservation = req.body;
      reservation.userId = req.query.id;

      const result = await db.collection("reservations").insertOne(reservation);
      if (result.acknowledged) {
        res.status(201).json({ message: "Reservation created" });
      } else {
        res.status(400).json({ error: "Reservation not created" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
