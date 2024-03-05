import React from "react"
import Recipe from "./Recipe"

export default function RecipeList({ dataToShow, onSelection, recipes }) {
  
  return (
    <ul className="list list-movies">
      {dataToShow && dataToShow.map((recipe) => (
        <Recipe recipe={recipe} key={recipe.id} onSelection={onSelection} />
      ))}
    </ul>
  )
}