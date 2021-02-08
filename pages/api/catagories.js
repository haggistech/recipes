import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const catagories = await db
    .collection("catagories")
    .find({})
    .sort({ mainingred: -1 })
    .limit(20)
    .toArray();

  res.json(catagories);
};
