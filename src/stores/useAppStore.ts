import { create } from "zustand";
import { createRecipesSlice, RecipeSliceType } from "./recipeSlice";

export const useAppStore = create<RecipeSliceType>((...a) => ({
    ...createRecipesSlice(...a)
}))