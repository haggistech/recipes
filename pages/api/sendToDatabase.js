import { connectToDatabase } from "../../util/mongodb";
import aws from 'aws-sdk';

export default async function(req, res) {

  var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
  
  const { description, mainingred, difficulty, preptime, cooktime, ingredients, title, lastupdated, id, mealtype, method } = req.body
  console.log('PROCESSING', req.body)
  const content = {
    Title: title,
    Description: description,
    MainIngred: mainingred,
    Difficulty: difficulty,
    PrepTime: preptime,
    CookTime: cooktime,
    Ingredients: ingredients,
    MealType: mealtype,
    Method: method
  }

  const { db } = await connectToDatabase();

  var isoDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  const document = {description:description,mainingred:[mainingred],difficulty:difficulty,preptime:preptime,cooktime:cooktime,ingredients:[ingredients],title:title,lastupdated:isoDate,id:{_numberInt:"1"},mealtype:mealtype,method:method};

  const recipes = await db
    .collection("recipes")
    .insertOne(document)

    
  console.log(
    `${recipes.insertedCount} documents was inserted with the _id: ${recipes.insertedId}`,
  );


  try {
    console.log('SUCCESS', content)
    res.status(200).send('Recipe Saved Successfully.')


  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Recipe Not Saved.')
  }
}