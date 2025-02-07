import { StateCreator } from "zustand"
import { getCategories } from "../services/RecipeService"
import { Categories, SearchFilter } from "../types"

export type RecipeSliceType = {
    categories: Categories
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        console.log(filters)
    }
})