// code that reaches out to database and gets data from that database

import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs'

// establishng database collection
const db = sql('meals.db');


// server components can be a promise in nextjs
export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // throw new Error('Loading meals failed')

    return db.prepare('SELECT * from meals').all();
    //  all method is usd to fetch all the data


}
 

// another function to getMealon the basis of a slug 
export function getMeal(slug) {
    return db.prepare('SELECT * from meals WHERE slug = ?').get(slug)
    // get method is used to fetch only one particular data
}



// function to save form data to database
export async function saveMeal(meal)  {

    // slugifying meal title
    meal.slug = slugify(meal.title, {lower: true })

    // removing harmful components from the instructions
    meal.instructions = xss(meal.instructions)

    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage),(error) => {
        if(error) {
            throw new Error('Saving image failed!')
        }
    })
    // this code takes an image associated with a meal, extracts its file extension, creates a new filename based on the meal's slug, sets up a write stream to a file in the public/images/ directory, and writes the image data to that file.

    meal.image = `/images/${fileName}`


    db.prepare(`
        INSERT into meals(title, summary, instructions, creator, creator_email, image, slug)
        VALUES(@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);





}