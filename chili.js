const ingredientsObject = {
    beef: {
        name: 'beef',
        qty: 1,
        unit: 'pound',
    },
    onion: {
        name: 'onion',
        qty: 1,
        unit: 'onion'
    },
    garlic: {
        name: 'garlic',
        qty: 1,
        unit: 'clove',
    },
    chilipowder: {
        name: 'chili powder',
        qty: 1,
        unit: 'tablespoon',
    },
    beans: {
        name: 'beans',
        qty: 1,
        unit: 'can',
    },
}

const ingredientButtons = document.querySelectorAll('.ingredient'); // Each 'Add' ingredient button
const recipeLines = document.querySelectorAll('.recipeingredient'); // Lines in the recipe section
const recipe = []; // An array of the lines in the recipe section
const recipeMap = new Map();


function pluralize(input, qty) {
    const item = ingredientsObject[input];
    const ingQty = item.qty;
    const ingName = item.name; // Unused as of now
    const ingUnit = item.unit; // Unused as of now
    let sentenceEnd;
    if(input !== 'onion') {
        sentenceEnd = ` of ${input}`;
    } else if (input === 'onion') {
        sentenceEnd = '';
    }
    return ingQty === 1 ? `${ingUnit} of ${input}` : `${ingUnit}s${sentenceEnd}`;
}

function ingredientSentence(input) {
    // console.log(input);
    const item = ingredientsObject[input];
    const qty = item.qty;
    const food = input;
    const sentence = ` - ${qty} ${pluralize(String(input), qty)}`;
    return sentence;
}

// Refresh and display the updated information for the ingredient
function refreshRecipe(eventIngredient, target) {
    recipeLines.forEach((item) => {
        if (target.dataset.ingredient === item.dataset.ingredient) {
            item.innerText = ingredientSentence(eventIngredient);
            //console.log('recipe changed');
        }
    })
}

function handleClick(eventIngredient, target) {
    const thisIngredient = ingredientsObject[eventIngredient]; // thisIngredient = the place in the object that matches the ingredient clicked on the button 
    thisIngredient.qty++;
    refreshRecipe(eventIngredient, target);
}

// Add eventListener to each button
ingredientButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        handleClick(event.target.dataset.ingredient, event.target);
    });
})

// Add each recipe line into the recipe array
recipeLines.forEach(event => {
    recipe.push(event.dataset.ingredient);
});

