import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Logo from './Logo';
import Main from './Main';
import Box from './Box';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import FavRecipeList from './FavRecipesList';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [favRecipesFromDB, setFavRecipesFromDB] = useState([])
  const [showFavRecipeList, setShowFavRecipeList] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]); //do searchInput
  const [query, setQuery] = useState(""); // do navbar - query to wartość z inputu z Search 

  function handleToggleShowFavRecipeList() {
    setShowFavRecipeList(() => !showFavRecipeList)
    // console.log(showFavRecipeList)
  }

  useEffect(() => {
    axios.get('http://localhost:3009/recipes')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    filterFavRecipes()  
  }, [recipes]);

  function handleSelection(recipe) {
    setSelectedRecipe(recipe)
  }//funkcja przekazująca kliknięty obiekt do zmiennej recipe, wywołaująca się na kliknięcie 

  function filterFavRecipes() {
    const arrayWithFav = recipes.filter(r => r.isFavourite === true);
    setFavRecipesFromDB(arrayWithFav);

    // console.log(favRecipesFromDB)
  }
  
  function handleSearch() {
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered)
    console.log(filteredRecipes)
  }
  
  return (
    <div className='App'>
      <NavBar handleToggleShowFavRecipeList={handleToggleShowFavRecipeList} query={query} setQuery={setQuery} onSearch={handleSearch}>
        <Logo />
      </NavBar>
      {/* <FavBox favRecipesFromDB={ favRecipesFromDB} /> */}
      <Main >
        <Box
          element={ 
            showFavRecipeList ?
              <FavRecipeList favRecipesFromDB={favRecipesFromDB} onSelection={handleSelection} handleToggleShowFavRecipeList={handleToggleShowFavRecipeList} /> :
              <RecipeList dataToShow={filteredRecipes.length > 0 ? filteredRecipes : recipes} onSelection={handleSelection} recipes={recipes} />
          }
        />
        <Box element={selectedRecipe ? <RecipeDetails selectedRecipe={selectedRecipe} /> : null} />
      </Main>
    </div>
  );
}