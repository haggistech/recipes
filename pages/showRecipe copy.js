import { connectToDatabase } from "../util/mongodb";
import Link from 'next/link'


export default function Top({ recipes }) {
    return (
<div class="container">
{recipes.map((recipes) => (
<div class="recipecontainer">
<table class="RecipeHeader" border="0">
<tbody>

    <tr>
        <td rowspan="9"><img class="recipe" src={`https://s3.eu-west-1.amazonaws.com/mikmclean.co.uk/recipes/${recipes._id}/main.png`} /></td>
        <td colspan="6"><h1>{recipes.title}</h1></td>
    </tr>
    <tr>
        <td colspan="4"><b>Main Ingredient:</b> {recipes.mainingred}</td>
        <td colspan="3"><b>Difficulty:</b> {recipes.difficulty}</td>
    </tr>

    <tr>
        <td colspan="4"><b>Preperation Time:</b> {recipes.preptime}</td>
        <td colspan="3"><b>Last Updated:</b> {recipes.lastupdated}</td>
    </tr>
    <tr>
        <td colspan="6">&nbsp;</td>

    </tr>
    <tr>
        <td colspan="6"><b>Ingredients</b><br /><br />{recipes.ingredients}</td>
    </tr>

    <tr>
        <td colspan="6"><b>Method</b><br /><br />{recipes.method}</td>
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
  
    const recipes = await db
      .collection("recipes")
      .find({})
      .toArray();
  
      const recipescount = await db
      .collection("recipes")
      .countDocuments();
  
    return {
      props: {
        recipes: JSON.parse(JSON.stringify(recipes)),
      },
    };
  }