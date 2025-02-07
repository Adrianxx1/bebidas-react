import { StateCreator } from "zustand"
import { getCategories } from "../services/RecipeService"
import { Categories, Recipes, SearchFilter } from "../types"
import { getRecipes } from "../services/RecipeService"

export type RecipeSliceType = {
    categories: Categories
    recipes: Recipes
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    recipes :{
        drinks: []
    },
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        const recipes = await getRecipes(filters)
        set ({
            recipes
        })
    }
})