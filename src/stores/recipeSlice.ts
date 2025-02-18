import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { Categories, Drink, Recipes, SearchFilter } from "../types"

export type RecipeSliceType = {
    categories: Categories
    recipes: Recipes
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    recipes: {
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
       set({
        recipes
       })
    },
    selectRecipe: async (id) => {
        await getRecipeById(id)
    }
})