const getSearch = ()=>{
    const inputValue = document.getElementById('search-box').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayItems(data))
}

const displayItems = items =>{
    const foodList = items.meals;
    const details = document.getElementById('meal-details')
    details.innerHTML = '';
    const cardArea = document.getElementById('cards');
    cardArea.innerHTML = '';
    if (foodList == null) {
    const inputValue = document.getElementById('search-box').value;
       const cardArea = document.getElementById('cards');
       cardArea.innerHTML =`
        <div class="no-meal">
            <h2>Sorry! No meal found for '${inputValue}'..!</h2>
            <i class="far fa-frown-open fa-3x"></i><br>
            <small>
                Make sure that all words are spelled correctly.
            </small>
        </div>
       `
    }else{
        foodList.forEach(item => {
            const cardsContainer = document.getElementById('cards');
            const createCard = document.createElement('div')
            const itemsCard =`
            <div  onclick="getMealDetails(${item.idMeal})" class="card">
                <img src="${item.strMealThumb}">
                <h2>${item.strMeal}</h2>
            </div>
            `
            createCard.innerHTML = itemsCard;
            cardsContainer.appendChild(createCard);
        });
    }
};


const getMealDetails = mealID =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
    .then(res => res.json())
    .then(data => showMealDetails(data.meals[0]))
};


const showMealDetails = (mealDetails) =>{
    const details = document.getElementById('meal-details')
    details.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'details-area'
    div.innerHTML =`
        <img src="${mealDetails.strMealThumb}" alt="There is supposed to be an image">
        <h2>${mealDetails.strMeal}</h2>
        <h4>Ingredients</h4>
        <ul>
            <li><i class="fas fa-check"></i>&nbsp ${mealDetails.strIngredient1}</li>
            <li><i class="fas fa-check"></i>&nbsp ${mealDetails.strIngredient2}</li>
            <li><i class="fas fa-check"></i>&nbsp ${mealDetails.strIngredient3}</li>
            <li><i class="fas fa-check"></i>&nbsp ${mealDetails.strIngredient4}</li>
            <li><i class="fas fa-check"></i>&nbsp ${mealDetails.strIngredient5}</li>
            <li><i class="fas fa-check"></i>&nbsp ${mealDetails.strIngredient6}</li>
        </ul>
    `
    details.appendChild(div);
};
