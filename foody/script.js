
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchSuggestions = document.getElementById('search-suggestions');
const searchResults = document.getElementById('search-results');
const favoriteList = document.getElementById('favorite-list');
const favoritesButton = document.getElementById('favorites');
const addToFavoriteButton = document.getElementById('add-to-fav');
const mealSection = document.getElementById('meal-section');
const favoriteDropdown = document.getElementById('favorite-dropdown');
const mealInstructions = document.getElementById('meal-instructions');
const instructionsHeading = document.getElementById('instructions-heading');

//API from the MEALDB
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Function to fetch meal suggestions from the API
async function fetchMealSuggestions(query) {
  try {
    const response = await fetch(`${API_URL}${query}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching meal suggestions:', error);
    return [];
  }
}

// Function to display meal suggestions
function displaySuggestions(suggestions) {
  searchSuggestions.innerHTML = '';
  suggestions.forEach((meal) => {
    const suggestionItem = document.createElement('li');
    suggestionItem.textContent = meal.strMeal;
    suggestionItem.addEventListener('click', () => {
      searchInput.value = meal.strMeal;
      searchSuggestions.innerHTML = '';
    });
    searchSuggestions.appendChild(suggestionItem);
  });
}


//function to get the stored favorite meals from the local storage
function getFavoriteMeals(){
    const favorites = localStorage.getItem('favoriteMeals');
    return favorites ? JSON.parse(favorites) : [];
}

//function to update and display the favorite meals list
function updateFavoriteList() {
    const favoriteMeals = getFavoriteMeals();
    favoriteList.innerHTML = '';
    favoriteMeals.forEach((meal) => {
        const li = document.createElement('li');
        li.textContent = meal;
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('fa-sharp', 'fa-solid', 'fa-trash');
        deleteButton.addEventListener('click', () => {
            //remove the meal from the list
            const updatedFavoriteMeals = favoriteMeals.filter((favoriteMeal) => favoriteMeal !== meal);
            localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavoriteMeals));
            updateFavoriteList();
        });
        li.appendChild(deleteButton);
        favoriteList.append(li);

    });
}


// Event listener for search input
searchInput.addEventListener('input', async (event) => {
  const query = event.target.value.trim();
  if (query.length >= 1) {
    const suggestions = await fetchMealSuggestions(query);
    displaySuggestions(suggestions);
  } else {
    searchSuggestions.innerHTML = '';
  }
});

// Event listener for search button
searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (query.length >= 1) {
    const suggestions = await fetchMealSuggestions(query);
    if (suggestions.length > 0) {
      const selectedMeal = suggestions[0]; // Display the first suggested meal
      const imageContainer = document.getElementById('image-container');
      const mealNameContainer = document.getElementById('meal-name');
     
      //display the meal image
      imageContainer.innerHTML = `<img src="${selectedMeal.strMealThumb}" alt="${selectedMeal.strMeal}" />`;
      mealNameContainer.textContent = selectedMeal.strMeal;

      //trial: fetch and display meal instructions
      const instructions = await fetchMealInstructions(selectedMeal.idMeal);
      mealInstructions.textContent = instructions;

        //display the meal section 
        mealSection.style.display = 'block';

        //show the "add to favourites button"
        addToFavoriteButton.style.display = 'inline-block';

        //show the instructions heading
        instructionsHeading.style.display = 'block';

        
    } else {
      searchResults.innerHTML = 'No results found.';
    }
  }
  
  

});


// Close suggestions on clicking outside the input
document.addEventListener('click', (event) => {
  if (!searchInput.contains(event.target) && !searchSuggestions.contains(event.target)) {
    searchSuggestions.innerHTML = '';
  }yield
});


//event listener for "add to favourites" button
addToFavoriteButton.addEventListener('click', () => {
    //logic to add the selected meal to fav
    const selectedMealName = document.getElementById('meal-name').textContent;
    const favoriteMeals = getFavoriteMeals();

    if(!favoriteMeals.includes(selectedMealName)){
        favoriteMeals.push(selectedMealName);
        localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
        updateFavoriteList();
    }
    
    favoriteList.style.display = 'none';  
});

//event listener to show the stored items on clicking on FAV
favoritesButton.addEventListener('click', () => {
    favoriteDropdown.style.display = 'block';
    //shpow the favorite list
    favoriteList.style.display = 'block';

    //update and display the list
    updateFavoriteList();
});

//event listener for clicking outside the fav  
document.addEventListener('click', (event) => {
    if(!favoritesButton.contains(event.target)){
        favoriteDropdown.style.display = 'none';
    }
});

//display the favorite list
updateFavoriteList();

//trial
//functions to fetch meal-instructions based on the meal i
async function fetchMealInstructions(mealId){
  try{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    const data = await response.json();
    return data.meals[0].strInstructions;
  } catch(error){
    console.error("error in fetching meal details:",error);
    return 'instructions are not avaialable';
  }
}