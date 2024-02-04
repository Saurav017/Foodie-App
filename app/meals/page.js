import MealsGrid from '@/components/meals/meals-grid'
import classes from './page.module.css'
import Link from 'next/link'
import { getMeals } from '@/lib/meals'
import { Suspense } from 'react';
import MealsLoadingPage from './loading';

async function Meals() {
    // making server component async itself
    const meals = await getMeals();

    return <MealsGrid meals={meals} />
}


export default async function MealsPage() {

    

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created {' '} <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favourite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share your favourite recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                
                <Suspense fallback={<MealsLoadingPage />}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}