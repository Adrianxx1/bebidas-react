import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])
  const [searchFilters, setSearchFilters] = useState({
                                      ingredient: '',
                                      category: ''      
                                    })

  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const categories = useAppStore((state) => state.categories)
  const searchRecipes = useAppStore((state) => state.searchRecipes)
  
  useEffect(() => {
    fetchCategories()
  }, [])

  function handleChange(
      e: ChangeEvent<HTMLInputElement> | 
      ChangeEvent<HTMLSelectElement>){
        setSearchFilters({
          ...searchFilters, [e.target.name]: e.target.value
        })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //Validación
    if(Object.values(searchFilters).includes('')){
      console.log('Debes llenar todo')
      return
    }

    searchRecipes(searchFilters)
  }

  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover': 'bg-slate-800' }>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo1.avif" alt="logotipo" />
                </div>

                <nav className="flex gap-4">
                  <NavLink 
                    className={({isActive}) => 
                        isActive ?
                          'text-rose-900 uppercase font-bold' :
                          'text-white uppercase font-bold'
                    }
                    to='/'>Inicio</NavLink>
                  <NavLink 
                    className={({isActive}) => 
                      isActive ?
                        'text-rose-900 uppercase font-bold' :
                        'text-white uppercase font-bold'
                  }
                    to='/favoritos/'>Favoritos</NavLink>
                </nav>
            </div>
            {
              isHome && (
                <form 
                  onSubmit={handleSubmit}
                  className="md:w-1/2 2xl:w-1/3 bg-rose-900 my-32 p-10 rounded-lg shadow space-y-6">
                  <div className="space-y-4">
                    <label 
                      htmlFor="ingredient"
                      className="block text-white uppercase font-extrabold text-lg">
                        Nombre o Ingredientes
                      </label>
                      <input 
                        id='ingredient'
                        type="text" 
                        name="ingredient"
                        onChange={handleChange}
                        value={searchFilters.ingredient}
                        className="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila Café"
                        />
                  </div>
                  <div className="space-y-4">
                    <label 
                      htmlFor="category"
                      className="block text-white uppercase font-extrabold text-lg">
                        Categoría
                      </label>
                      <select 
                        id='category'
                        name="category"
                        onChange={handleChange}
                        value={searchFilters.category}
                        className="p-3 w-full rounded-lg focus:outline-none"
                        >
                          <option value="">-- Seleccione --</option>
                          {
                            categories.drinks.map(category => (
                              <option 
                                value={category.strCategory}
                                key={category.strCategory}>
                                  {category.strCategory}
                                </option>
                            ))
                          }
                        </select>
                  </div>
                  <input 
                    type="submit"
                    className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase" 
                    value="Buscar Recetas" />
                </form>
              )
            }
        </div>
    </header>
  )
}
