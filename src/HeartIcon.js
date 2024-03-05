//HeartIcon.js
import React, { useEffect, useState } from "react";

export default function HeartIcon({ selectedRecipe }) {
    const [isFavourite, setIsFavourite] = useState(selectedRecipe.isFavourite) //jako domyślną wartość stanu przekazuje true lub false z danych z bazy

//----------------------------------------------------------------------------------
    //ułatwia wyświetlenie 
    useEffect(() => {
        setIsFavourite(selectedRecipe.isFavourite);
        // console.log(`isFavourite: ${selectedRecipe.isFavourite}, state-isFavourite: ${isFavourite}`);
    }, [selectedRecipe.isFavourite]);
//-----------------------------------------------------------------------------------
    
    return (
        <div className='heart-icon'>
            <span onClick={toggleFavourite}>
                {isFavourite ? <svg role="img" className="svg-icon-heart"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#ff0000"/> </g>

</svg> :
                    <svg role="img" className="svg-icon-heart-empty" viewBox="0 0 20 20">
                        <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                    </svg>  
                }
            </span>
        </div>
    );

    function toggleFavourite() {
        const newIsFavourite = !isFavourite; 
        setIsFavourite(newIsFavourite);

        selectedRecipe.isFavourite = newIsFavourite; //przekazuję do zmiennej frontendu zmianę, która nastąpiła czyli jaka jest wartość isFavourite żeby nie pobierać tego znowu z backendu
        apiUpdateIsFavourite(newIsFavourite); // do funkcji aktualizującej bazę przekazują wartość tej samej zmiennej co wszędzie, która odpowiada za to czy przepis został dodany do ulubionych

        addToFavouriteItems();//wywołanie funkcji, która przekazuje dane obiektu z klikniętego serdusza do listy elementów ulubionych "items"
    }

    

    function addToFavouriteItems() {
        let favItems = []

        if (selectedRecipe.isFavourite === true) {
            favItems = [...favItems, selectedRecipe]
            console.log(favItems)
        }
    }

    function apiUpdateIsFavourite(newIsFavourite) {
        const url = `http://localhost:3009/recipes/${selectedRecipe.id}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isFavourite: newIsFavourite
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log('Updated successfully:', data);
            })
            .catch(error => {
                // console.error('Update failed:', error);
            }) 
        }
}