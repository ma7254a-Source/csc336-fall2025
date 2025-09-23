
const inventory = [];

//grab DOM elements using queryselector/queryselectorALL
const form = document.querySelector('#item-form');
const NameInput = document.querySelector('#name');
const categorySelect = document.querySelector('#category');
const quantityInput = document.querySelector('#quantity');
const expiresInput = document.querySelector('#expires');
const locationRadios = document.querySelectorAll('#input[name="location"]');
const itemsList = document.querySelector('#items-list')

//our error box, allows us to write messages into the DOM
const errorBox = document.createElement('div');
errorBox.id= 'form-errors';
errorBox.style.color = '#b00020';
errorBox.style.marginTop= '10px';
form.prepend(errorBox); 

//reads which radio button in the location groups is currently selected, returns value
function getSelectedLocation(){
    for (let i = 0; i < locationRadios.length; i++){
        if (locationRadios[i].checked) {
            return locationRadios[i].value; 
        }
    }
    return ''; //validation in case its emmpty, we require a field
}

function isPastDate(yyyyMmDd) {
    if (!yyyyMmDd) return false;
    const today = new Date();
    today.setHours (0, 0, 0, 0); //compares by date only
    const given = new Date(yyyyMmDd + 'T00:00:00');
    return given < today; 
}

function showErrors(errors) {
    if (!errors.length) {
        errorBox.textContent = '';
        return;
    }
    //List of errors
    const ul = document.createElement('ul');
    for (let i = 0; i < error.length; i++) {
        const li = document.createElement('li');
        li.textContent = errors[i];
        ul.appendChild(li);
}
    //clear and add
    errorBox.innerHTML = '';
    errorBox.appendChild(ul);
    //moves focus to first invalid field
    if (errors[0].toLowerCase().includes('name')) NameInput.focus();
    else if (errors[0].toLowerCase().includes('category')) categorySelect.focus();
    else if (errors[0].toLowerCase().includes('quantity')) quantityInput.focus();
    else if (errors[0].toLowerCase().includes('expiration')) expiresInput.focus();
} 

function addItemToDom(item) {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.quantity} (${itemsList.category}, ${item.location}) - expires ${item.expires}`;
    itemsList.appendChild(li);
}

//Our validation handler 
form.addEventListener('submit', function (evt)) {
    evt.preventDefault();
    const errors = []
    const name = (NameInput.value || '').trim();
    const category = (categorySelect.value || '').trim();
    const quantityStr = (quantityInput.value || '').trim();
    const expires = (expiresInput.value || '').trim();
    const location = getSelectedLocation();
    //-- validation -- 
    //All fields have an input
    if (!name) errors.push('item name is required.');
    if (!category) errors.push('category is required.');
    if (!quantityStr) errors.push('quantity is required.');
    if (!expires) errors.push('expiration date is required.');
    if (!location) errors.push('location is required.');
    //Name must be at least 3 characters
    if (name && name.length < 3) {
        errors.push('Items must be at least 3 characters long.')
    }

    //quantity must be a number larger than 0 and less than or equal to 10
    const quantity = Number(quantityStr);
    if (quantityStr && (isNaN(quantity) || quantity <= 0)) { 
        errors.push('Quantity must be number greater than zero.')
    }
    if (!isNaN(quantity) && quantity >10) {
        errors.push('Quantity must be 10 or less.')
    }
    //expiration date cannot be in the past. 
    if (expires && isPastDate(expires)) {
        errors.push('expiration date cannot be in the past.')
    }
    //if any errors, display them
    if (errors.length > 0) {
        showErrors(errors);
        return;
    }
    //clear previous errors
    showErrors([]);

    //build new object for our array
    const newItem = {
        name: name,
        category: category,
        expires: quantity,
        location: location,
        addedAt: new Date().toISOString()
    }; 
    //store in our array
    inventory.push(newItem);

    //update the DOM
    addItemToDom(newItem);

    //reset the form when finished
    form.reset();
    NameInput();

}
