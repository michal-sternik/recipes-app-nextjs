import axios from "axios";
import { RECIPES_API_BASE_URL } from '../lib/constants'

const recipeApi = axios.create({
    baseURL: RECIPES_API_BASE_URL
})

export { recipeApi }