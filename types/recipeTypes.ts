export interface RecipesType {
    recipes: Array<RecipeType>
    total: number;
    skip: number;
    limit: number;
}

export interface RecipeType {
    id: number;
    tags: string[];
    name: string;
    cuisine: string;
    cookTimeMinutes: number;
    image: string;
    difficulty: "Easy" | "Medium" | "Hard",
}

export enum ColorsENUM {
    RED = 'RED',
    GREEN = 'GREEN',
    ORANGE = 'ORANGE',
    BLUE = 'BLUE'
}

export interface RecipeDetailsType {
    id: number;
    tags: string[];
    name: string;
    cuisine: string;
    cookTimeMinutes: number;
    image: string;
    difficulty: "Easy" | "Medium" | "Hard",
    ingredients: string[],
    instructions: string[],
    servings: number;
}