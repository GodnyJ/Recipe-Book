import React from "react";
import HeartIcon from "./HeartIcon";

export default function RecipeDetails({ selectedRecipe }) {

  // console.log(selectedRecipe.isFavourite);

  return (
    <div className='details'>
      <>
        <header>
          <img src={selectedRecipe.image_url} alt="Poster of meal" />
          <div className='details-overview'>
            <h2>{selectedRecipe.title}</h2>
            <p> {selectedRecipe.ingredients.length} ingredients</p>
            <p><span role="img" aria-label="clock">⏱</span> {selectedRecipe.execution_time} min</p>
            <p><span role="img" aria-label="star">⭐</span> {selectedRecipe.rating}/10</p>
            <HeartIcon selectedRecipe={selectedRecipe}  />
          </div>
        </header>
        <section>
          <h3>Ingredients:</h3>
          <ul className='ingredients'>
            {selectedRecipe.ingredients.map((ingredient) => (
              <li key={crypto.randomUUID()}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{selectedRecipe.instructions}</p>
        </section>
      </>
    </div>
  )
}