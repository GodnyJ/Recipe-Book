import React from "react"

export default function Recipe({ recipe, onSelection }) {
  return (
    <li onClick={()=> onSelection(recipe)}>
      <img src={recipe.image_url} alt={`${recipe.title}`} />
      <h3>{recipe.title}</h3>
      <p>
        <span role="img" aria-label="star">⭐</span>
        <span>{recipe.rating}</span>
        <span role="img" aria-label="clock">⏱</span>
        <span>{recipe.execution_time} min</span>
      </p>
    </li>
  )
}