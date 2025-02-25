import { StateCreator } from "zustand"
import { Recipe } from "../types"

export type FavoritesSliceType = {
    favorites: Recipe[]
    addFavorites: (recipe: Recipe) => void
    recipeExist: (id: Recipe['idDrink']) => boolean
    loadFavorites: () => void
    alertMessage: string | null; // Nuevo estado para el mensaje de alerta
    showAlert: (message: string) => void; // Nueva función para mostrar la alerta
    clearAlert: () => void; // Nueva función para limpiar la alerta
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    alertMessage: null,
    addFavorites: (recipe) => {
        const exists = get().recipeExist(recipe.idDrink);
        if (exists) {
            set({
                favorites: [...get().favorites.filter(d => d.idDrink !== recipe.idDrink)],
                alertMessage: 'Eliminado de favoritos.',
            });
        } else {
            set({
                favorites: [...get().favorites, recipe],
                alertMessage: 'Agregado a favoritos.',
            });
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
        get().showAlert(get().alertMessage || ''); // Mostrar la alerta
    },
    recipeExist: (id) => {
        return get().favorites.some(d => d.idDrink === id);
    },
    loadFavorites: () => {
        const dataStorage = localStorage.getItem('favorites');
        set({
            favorites: dataStorage ? JSON.parse(dataStorage) : []
        });
    },
    showAlert: (message) => {
        set({ alertMessage: message });
        setTimeout(() => get().clearAlert(), 3000); // Limpia la alerta después de 3 segundos
    },
    clearAlert: () => {
        set({ alertMessage: null });
    }
});