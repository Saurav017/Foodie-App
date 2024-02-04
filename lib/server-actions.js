'use server'

import { saveMeal } from "./meals"

// use server 
export async function shareMeal(formData) {
    'use server'

    // getting the form data
const meal = {
    title : formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image : formData.get('image'),
    creator : formData.get('name'),
    creator_email : formData.get('email')
}
    // storing them in database
    await saveMeal(meal)
}