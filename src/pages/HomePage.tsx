import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function HomePage(){

    const recipes = useAppStore((state) => state.recipes)

    const hasRecipes = useMemo(() => recipes.drinks.length > 0 , [recipes])

    return (
        <>
        <h1 className="text-6xl font-extrabold">Recetas</h1>
        {
            hasRecipes ? (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
                {
                    recipes.drinks.map(drink => (
                        <DrinkCard drink={drink} key={drink.idDrink} />
                    ))
                }
                </div>
                </>
            ): (
                <p className="my-10 text-center text-2xl">Aun no haz buscado, explora nuestras recetas con tu ingediente favorito.</p>
            )
        }
        </>
    )
}