
export default async function(req, res) {


  const { title, shortdescription, fulldescription, mainingred, totaltime, ingredients, mealtype } = req.body
  console.log('PROCESSING', req.body)
  const content = {
    Title: title,
    ShortDescription: shortdescription,
    Fulldescription: fulldescription,
    MainIngred: mainingred,
    TotalTime: totaltime,
    Ingredients: ingredients,
    MealType: mealtype
  }

  try {
    console.log('SUCCESS', content)
    res.status(200).send('Recipe Saved Successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Recipe Not Saved.')
  }
}