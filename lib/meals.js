import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  // adding dummy delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  //adding dummy error
  // throw new Error("Loading meals failed");

  // run is used when you are inserting data, all is used when youre fetching data
  return db.prepare("SELECT * from meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  // We want a slug for each meal so we are using this 3rd party package to create a slug
  meal.slug = slugify(meal.title, { lower: true });

  // Since we are exporting html content in our form, we should protect ourself from xss attacks
  meal.instructions = xss(meal.instructions);

  // Storing files in the db is a bad idea, because it slows things down
  // Instead we will store them in the file system, i.e. the public folder

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed: ");
    }
  });

  // Since public is included automatically, we should not write it on our own
  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
