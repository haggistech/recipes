import { connectToDatabase } from "../util/mongodb";

export default function Top({ recipes }) {
  return (
    <div>
      <h1>Top 10 recipes of All Time</h1>
      <ul>
        {recipes.map((recipes) => (
          <li>
            <h2>{recipes.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const recipes = await db
    .collection("recipes")
    .find({})
    .limit(100)
    .toArray();

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };
}
