import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
export default function HomePage(){
    const recipes = useAppStore((state) => state.recipes)


    const  hasRecipes = useMemo (() => recipes.drinks.length > 0 , [recipes])
    return (
        <>
        <h1 className="text-6xl front-extrabold">Recetas</h1>
       

        {hasRecipes ? (
            <>
            <p>Si hay bebidas</p>
            </> ):(
                <p className="my-10 text center text-2xl">No hay bebidas, busca en el formulario</p>
            )
        }
        </>
    )
    
}