
import { RecipeDetailsType, RecipeType } from "../types/recipeTypes.ts"
import { recipeApi } from "./recipeApi.ts"

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