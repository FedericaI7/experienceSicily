import clientPromise from "../../../../utils/mongodb";

export default async function handler(req, res) {
  let data = [];
  if (req.method === "GET") {
    const client = await clientPromise;
    const db = client.db("final-project");
    data = await db.collection("experiences").find().toArray();
    console.log(data);

    res.status(200).json(data);
  }
}
