import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // run is used when you are inserting data, all is used when youre fetching data
  return db.prepare("SELECT * from meals").all();
}
