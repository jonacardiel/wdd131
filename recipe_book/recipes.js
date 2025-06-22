// This file will contain JavaScript for handling recipe data,
// search functionality, and dynamic content generation.

// Placeholder for recipe data (example structure based on requirements)
const recipes = [
    {
        id: "apple-crisp",
        name: "Apple Crisp",
        image: "images/images/apple-crisp.jpg",
        description: "This classic apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream. A perfect balance of sweet apples and a buttery oat topping.",
        rating: 4,
        tags: ["dessert", "fall", "easy", "fruit"]
    },
    {
        id: "black-beans-and-rice",
        name: "Black Beans and Rice",
        image: "images/images/black-beans-and-rice.jpg",
        description: "A hearty and flavorful dish of black beans and rice, a staple in many cuisines. It's a satisfying and economical meal, often served with a hint of cilantro and lime.",
        rating: 4,
        tags: ["vegetarian", "main-dish", "healthy", "latin"]
    },
    {
        id: "chicken-curry",
        name: "Chicken Curry",
        image: "images/images/chicken-curry.webp",
        description: "A rich and aromatic chicken curry, bursting with spices and tender chicken pieces simmered in a creamy, flavorful sauce. Perfect with rice or naan bread.",
        rating: 5,
        tags: ["main-dish", "spicy", "comfort-food", "asian"]
    },
    {
        id: "chocolate-chip-cookies",
        name: "Chocolate Chip Cookies",
        image: "images/images/chocolate-chip-cookies.jpg",
        description: "The ultimate classic chocolate chip cookie recipe, yielding soft, chewy centers and slightly crispy edges, loaded with melty chocolate chips. A timeless favorite!",
        rating: 5,
        tags: ["dessert", "baking", "sweet", "kid-friendly"]
    },
    {
        id: "escalopes-de-poulet-a-la-creme",
        name: "Escalopes de Poulet à la Crème",
        image: "images/images/escalopes-de-poulet-a-la-creme.webp",
        description: "Tender chicken escalopes in a luxurious creamy mushroom sauce, a delightful French-inspired dish that's both elegant and comforting. Ideal for a special dinner.",
        rating: 4,
        tags: ["main-dish", "french", "creamy", "chicken"]
    },
    {
        id: "german-gooseberry-cake",
        name: "German Gooseberry Cake",
        image: "images/images/german-gooseberry-cake.jpg",
        description: "A traditional German gooseberry cake, featuring tart gooseberries baked into a sweet, tender cake base, often topped with meringue or streusel. A delightful summer treat.",
        rating: 4,
        tags: ["dessert", "baking", "fruit", "german"]
    },
    {
        id: "roasted-potatoes",
        name: "Roasted Potatoes",
        image: "images/images/roasted-potatoes.webp",
        description: "Perfectly crispy on the outside and fluffy on the inside, these roasted potatoes are seasoned with herbs and garlic, making them an ideal side dish for any meal.",
        rating: 4,
        tags: ["side-dish", "vegetarian", "easy", "comfort-food"]
    },
    {
        id: "sweet-potato-waffle",
        name: "Sweet Potato Waffle",
        image: "images/images/sweet-potato-waffle-md.jpg",
        description: "Healthy and delicious sweet potato waffles, a unique twist on a breakfast classic. Great for a savory meal or a slightly sweet treat, packed with nutrients.",
        rating: 4,
        tags: ["breakfast", "healthy", "vegetarian", "brunch"]
    }
];

/**
 * Function to generate star rating HTML.
 * @param {number} rating - The numerical rating (e.g., 4 for 4 stars).
 * @returns {string} HTML string for stars.
 */
function generateStarRating(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span aria-hidden="true" class="icon-star">⭐</span>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
    }
    return starsHtml;
}

/**
 * Function to display recipes on the page.
 * @param {Array} recipesToDisplay - An array of recipe objects to render.
 */
function displayRecipes(recipesToDisplay) {
    const recipesListContainer = document.getElementById('recipes-list');
    if (!recipesListContainer) {
        console.error("Recipes list container not found!");
        return;
    }
    recipesListContainer.innerHTML = ''; // Clear existing recipes

    if (recipesToDisplay.length === 0) {
        recipesListContainer.innerHTML = '<p class="no-results">No recipes found matching your criteria. Try a different search!</p>';
        return;
    }

    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipe-card');

        // Ensure tags array is not empty before accessing tags[0]
        const tagToDisplay = recipe.tags && recipe.tags.length > 0 ? recipe.tags[0] : 'general';

        recipeCard.innerHTML = `
            <div class="recipe-image-container">
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                <span class="recipe-tag">${tagToDisplay}</span>
            </div>
            <div class="recipe-info">
                <h2 class="recipe-title">${recipe.name}</h2>
                <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                    ${generateStarRating(recipe.rating)}
                </span>
                <p class="recipe-description">${recipe.description}</p>
            </div>
        `;
        recipesListContainer.appendChild(recipeCard);
    });
}

// Initial display of recipes when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayRecipes(recipes); // Display all recipes from the placeholder array
    
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            // Filter recipes by name or tags
            const filteredRecipes = recipes.filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm) || 
                (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
            displayRecipes(filteredRecipes); // Display filtered recipes
        });
    } else {
        console.error("Search form or input not found!");
    }
});
