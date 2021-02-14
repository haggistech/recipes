import { connectToDatabase } from "../util/mongodb";

export default function Top({ recipes }) {
  return (
    <div>
      <h1>Top 10 Chicken Recipes</h1>
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
    .find({catid: '6016c9722f31ae2653189154'})
    .limit(100)
    .toArray();

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };
}
