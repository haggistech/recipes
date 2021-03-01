import { connectToDatabase } from "../util/mongodb";
import React from "react";
import Head from "next/head";

export default function Top({ recipes }) {
  return (
    <div>
      <h1>Top 10 recipes of All Time</h1>
      <ul>
        <li>
          Inserted {recipes.insertedCount} Record(s) with ID:{" "}
          {recipes.insertedId}
        </li>
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const document = {
    shortdescription: "Amazing Tasty Mik",
    mainingred: ["Mik"],
    totaltime: { _numberInt: "1" },
    ingredients: ["Mik", "More Mik"],
    title: "Juicy Tasty Mik",
    fulldescription:
      "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah",
    lastupdated: "2015-08-26 00:03:50.133000000",
    id: { _numberInt: "1" },
    mealtype: "Dinner",
  };

  const recipes = await db.collection("recipes").insertOne(document);

  console.log(
    `${recipes.insertedCount} documents was inserted with the _id: ${recipes.insertedId}`
  );

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };
}
