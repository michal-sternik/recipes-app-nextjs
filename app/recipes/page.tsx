import RecipeService from '@/api/recipeService';
import Home from '@/components/Home/Home'
import { RecipeType } from '@/types/recipeTypes';
import React from 'react'

const HomePage = async () => {

    //server component loads initial data on the server and then sends them to Home client component
    const initialRecipeData: RecipeType[] = await RecipeService.getRecipes(
        `/recipes/search?limit=50&select=tags,name,image,difficulty,cuisine,cookTimeMinutes,image`
    );


    return (
        <Home initialRecipes={initialRecipeData} />
    )
}

export default HomePage