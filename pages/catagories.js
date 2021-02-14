import { connectToDatabase } from "../util/mongodb";
import Link from 'next/link'

export default function Top({ recipes }) {
  return (
    <div>
      <h1>Catagories</h1>
      <ul>
        {recipes.map((recipes) => (
          <li>
            <Link href={{ pathname: 'listrecipes', query: { main: recipes.mainingred}}}><a><h3>{recipes.mainingred}</h3></a></Link>{recipes.shortdescription}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const recipes = await db
    .collection("catagories")
    .find({})
    .toArray();

    const recipescount = await db
    .collection("recipes")
    .countDocuments();

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
      recipescount: JSON.parse(JSON.stringify(recipescount)),
    },
  };
}
