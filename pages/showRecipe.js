import { connectToDatabase } from "../util/mongodb";
import Link from "next/link";

export default function Top({ recipes }) {
  return (
    <div class="container">
      {recipes.map((recipes) => (
        <div class="recipecontainer">
          <table class="RecipeHeader" border="0">
            <tbody>
              <tr>
                <td rowspan="7">
                  <img
                    class="recipe"
                    src={`https://s3.eu-west-1.amazonaws.com/mikmclean.co.uk/recipes/${recipes._id}/main.png`}
                    onerror="if (this.src != 'https://s3.eu-west-1.amazonaws.com/mikmclean.co.uk/recipes/default.jpg') this.src = 'https://s3.eu-west-1.amazonaws.com/mikmclean.co.uk/recipes/default.jpg';"
                  />
                </td>
                <td colspan="6">
                  <h2>{recipes.title}</h2>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <b>Main Ingredient:</b> {recipes.mainingred}
                </td>
                <td colspan="3">
                  <b>Difficulty:</b> {recipes.difficulty}
                </td>
              </tr>

              <tr>
                <td colspan="4">
                  <b>Preperation Time:</b> {recipes.preptime}
                </td>
                <td colspan="3">
                  <b>Last Updated:</b> {recipes.lastupdated}
                </td>
              </tr>
              <tr>
                <td colspan="6">
                  <b>Description:</b> <br />
                  {recipes.description}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const recipes = await db.collection("recipes").find({}).toArray();

  const recipescount = await db.collection("recipes").countDocuments();

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };
}
