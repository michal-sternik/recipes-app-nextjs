
import { RecipeDetailsType, RecipeType } from "../types/recipeTypes"
import { recipeApi } from "./recipeApi"

class RecipeService {

    public static async getRecipeById(url: string): Promise<RecipeDetailsType> {

        const response = await recipeApi.get(url)
        return response.data
    }

    public static async getRecipes(url: string): Promise<RecipeType[]> {

        const response = await recipeApi.get(url)
        return response.data.recipes
    }

}

export default RecipeService