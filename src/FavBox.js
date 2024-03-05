import React from "react";
import FavRecipeList from "./FavRecipesList";

export default function FavBox({favRecipesFromDB, goToPrevious, goToNext}) {
    return (
        <div>
            
            <div className="fav-box">
                <FavRecipeList favRecipesFromDB={ favRecipesFromDB} />
            </div>  
            
        </div>
        
    )
}