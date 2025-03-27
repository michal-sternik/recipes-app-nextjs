import { Just_Me_Again_Down_Here, Nunito } from "next/font/google";
import { ColorsENUM } from "../types/recipeTypes";

export const getColorByDifficulty = (difficulty: string): ColorsENUM => {
    switch (difficulty) {
        case "Easy":
            return ColorsENUM.GREEN;
        case "Medium":
            return ColorsENUM.ORANGE;
        case "Hard":
            return ColorsENUM.RED;
        default:
            return ColorsENUM.BLUE;
    }
};

export const justMe = Just_Me_Again_Down_Here({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-justme",
    display: "swap",
})

export const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-nunito",
    display: "swap",
})