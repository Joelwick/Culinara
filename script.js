// script.js

const apiKey = '347ba4bd08704686a4b2a8b590004082'; // Replace with your Spoonacular API key

document.getElementById('search-button').addEventListener('click', searchRecipes);
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('recipe-modal').classList.add('hidden');
});

async function searchRecipes() {
    const query = document.getElementById('search-input').value;
    if (!query) return;

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=9&apiKey=${apiKey}`);
    const data = await response.json();

    displayRecipes(data.results);
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'bg-white p-4 rounded shadow';

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-48 object-cover rounded mb-4">
            <h2 class="text-xl font-bold mb-2">${recipe.title}</h2>
            <button class="bg-teal-500 text-white p-2 rounded" onclick="viewRecipe(${recipe.id})">View Recipe</button>
        `;

        recipeList.appendChild(recipeCard);
    });
}

async function viewRecipe(id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
    const recipe = await response.json();

    const recipeDetails = document.getElementById('recipe-details');
    recipeDetails.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-64 object-cover rounded mb-4">
        <h3 class="text-xl font-bold mb-2">Ingredients:</h3>
        <ul class="list-disc list-inside mb-4">
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h3 class="text-xl font-bold mb-2">Instructions:</h3>
        <p>${recipe.instructions}</p>
    `;

    document.getElementById('recipe-modal').classList.remove('hidden');
}
