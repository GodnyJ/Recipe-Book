import React from 'react';
import { render } from '@testing-library/react';
import RecipeList from './RecipeList';
import '@testing-library/jest-dom';
import 'mutationobserver-shim';


describe('RecipeList', () => {
    const mockRecipes = [
        { id: 1, title: 'Tomato Soup' },
        { id: 2, title: 'Spaghetti Carbonara' }
    ];

    test('renders a list of recipes', async () => {
        const mockDataToShow = mockRecipes; // Możesz użyć mockRecipes jako dataToShow
        const mockOnSelection = jest.fn();

        const { findByText } = render(<RecipeList  dataToShow={mockDataToShow} onSelection={mockOnSelection} recipes={mockRecipes} />);
        

        expect(await findByText('Tomato Soup')).toBeInTheDocument();
        expect(await findByText('Spaghetti Carbonara')).toBeInTheDocument();
    });
});

// jak jest bez await to nie działa booperacja wykonuje się jeszcze wtedy kiedy w RecipeList zmienna dataToShow jest undefined
// jak jest await to nie działa w pokazuje się error: MutationObserver is not a constructor
// ale zaktualizowałam Jest i jsdom. często występuje w testach Reacta, gdy używasz narzędzi takich jak React Testing Library lub Jest w środowisku, które nie wspiera wszystkich funkcji DOM przeglądarki, jak na przykład Node.js.

//Przyczyna Błędu
//MutationObserver jest interfejsem przeglądarki służącym do rejestrowania zmian w DOM. Jest on wykorzystywany przez React Testing Library w funkcjach takich jak waitFor i findBy. Błąd sugeruje, że środowisko, w którym uruchamiane są testy, nie ma dostępu do MutationObserver.
//to też zrobiłam:  dodać polifill dla MutationObserver ,instalując bibliotekę polifill (np. mutationobserver-shim) i importując ją w plikach testowych lub w pliku konfiguracyjnym Jest (setupFilesAfterEnv).

//później był błąd, że nie ma odpowiedniej liczby przekazywanych propsów więc trzeba było uzupełnić o 15 i 16b linikjkę oraz o to co jest przekazywane w <RecipeList..