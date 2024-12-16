// Set API URL and key.
const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const apiKey = "yum-vKkkQHqQboi7c6J";
const tenantId = "1bn0";

// Option for request (key).
const options = {
    method: 'POST',
    headers: {
        "Content-Type": 'application/json',  // Send JSON in body
        "x-zocom": apiKey  // My API-nyckel
    },

    body: JSON.stringify({ name: 'Koi' }), // Covert to JSON string.
};

//Function to register Tenant
async function registerTenant(){ 
    try{
        const response = await fetch(apiUrl + "/tenants", options); // Call API.
        const data = await response.json(); // Convert to JSON.
        console.log("Tenant registered successfully: ", data);
    } catch(error){
            console.error("Error registering tenant: ", error); 
        }
    }

// Function to fetch menu from API (by using "async").
async function fetchMenu() {
    try { // Using "try" to checking errors.
        const response = await fetch(`${apiUrl}menu`, { // Send request to get info from API by using "fetch". 
            method: 'GET', // Using medthod "GET" to get info from API.
            headers: { // "Headers" = sections that request information from API.
                "x-zocom": apiKey // Sending API key to verify the user's identity.
            }
        });
        const menuData = await response.json(); // Convert data from API(response) into JS Object/Array.
        console.log(menuData); 
        renderMenu (menuData.items); // Show menu on screen.              
    } catch (error) { // Checking errors.
        console.error("Error fetching menu:", error);
    }   
}
fetchMenu();

// Disabled since tenant is already registered.
//registerTenant();

// Function to display a menu on an HTML page.
/*function renderMenu(menuData) { // Create "renderMenu" that uses menuData to show a menu on the screen.
    const menuContainer = document.getElementById('menu-container'); 

    // Remove old info & reset the internal HTML of the new menuContainer (adding an <h1> heading for the menu name & an empty <div>).
    menuContainer.innerHTML = `
        <h1 class="menu-title"> MENY </h1>
        <div class="menu-section"></div>
    `;
    // Create "menuSection" for  display the menu items.
    const menuSection = menuContainer.querySelector('.menu-section'); 

    // Loop for menu.
    menuData.forEach(item => {
        // Create a new <li> element for each menu item. Add a menu-item class to <li>, <div>, & <p>.
        const menuItem = document.createElement('li'); 
        menuItem.classList.add('menu-item'); 
        menuItem.innerHTML = `
            <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.price} SEK</span>
            </div>
            <p class="item-description">${item.description}</p>
        `;
        menuSection.appendChild(menuItem);
    });
}*/

// Function to display a menu on an HTML page.
function renderMenu(menuData) {
    const foodMenu = document.getElementById('food-menu');
    const sauceMenu = document.getElementById('sauce-menu');
    const drinkMenu = document.getElementById('drink-menu');
    const cart = []; // Array for keeping items added in shopping cart. 

    // Get elements related to shopping cart details and Page 2.
    const cartDetailsButton = document.getElementById('cart-details-button'); // Shopping Cart details button.
    const page2 = document.querySelector('.page2-shoppingCart'); // Page 2 section.

    // Reset (old) HTML.
    foodMenu.innerHTML = '';
    sauceMenu.innerHTML = '';
    drinkMenu.innerHTML = '';

    // Remove (old) info and create the new menu. 
    menuData.forEach(item => {
        // Create <li> for all menus.
        const menuItem = document.createElement('li');
        menuItem.classList.add('menu-item');
        let descriptionHTML = '';

        // Add descriptions (not for drinks). 
        if (item.type !== 'drink') {
            descriptionHTML = `<p class="item-description">${item.description || 'Ingen beskrivning'}</p>`;
        }

        // Create HTML lists of menu. 
        menuItem.innerHTML = `
            <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price"> ${item.price || 'N/A'} SEK</span> 
            </div>
            ${descriptionHTML}
        `;

        // Add event listener for items.
        const itemName = menuItem.querySelector('.item-name');
        itemName.addEventListener('click', () => {
            // Add items in shopping cart. 
            cart.push(item);
            alert(`${item.name} har lagts till i din varukorg.`);

            // Update items in shopping cart.
            updateCartDisplay(cart);
        });

        // Fix 3 menu groups.
        if (item.type === 'wonton') {
            foodMenu.appendChild(menuItem);
        } else if (item.type === 'dip') {
            sauceMenu.appendChild(menuItem);
        } else if (item.type === 'drink') {
            drinkMenu.appendChild(menuItem);
        }
    });

    // Event listener to show Page 2 when clicking Shopping Cart details button.
    cartDetailsButton.addEventListener('click', () => {
        page2.classList.remove('hidden'); // Show Page 2.
        renderCartItems(cart); // Render the shopping cart details on Page 2.
    });
}

// Page 2 : Shopping Cart 
// Update the display of the shopping cart.
function updateCartDisplay(cart) {
    const cartItemCount = document.getElementById('cart-item-count');
    
    // Show the total number of items in the cart.
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    cartItemCount.textContent = `: ${totalItems} artiklar`;

    const cartDetailsButton = document.getElementById('cart-details-button');

    // Show/Hide the cart details button.
    if (cart.length > 0) {
        cartDetailsButton.classList.remove('hidden');
    } else {
        cartDetailsButton.classList.add('hidden');
    }
}

// Show the items in the shopping cart on page 2.
function renderCartItems(cart) {
    const cartItemsList = document.querySelector('.cart-items');
    const totalPriceElem = document.querySelector('.total-price');

    // Remove (old) items.
    cartItemsList.innerHTML = '';

    // Create (new) items.
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price} SEK</span>
            <div class="item-controls">
                <button class="control-button" data-action="increase" data-item="${item.name}"> + </button>
                <span class="item-quantity">${item.quantity || 1}</span> stycken
                <button class="control-button" data-action="decrease" data-item="${item.name}"> - </button>
            </div>
        `;
        cartItemsList.appendChild(cartItem);
    });

    // Add Event Listener for (+ -) items. 
    const controlButtons = cartItemsList.querySelectorAll('.control-button');
    controlButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.getAttribute('data-action');
            const itemName = e.target.getAttribute('data-item');

            // Check if the press +increases or -decreases the quantity of items.
            if (action === 'increase') {
                changeItemQuantity(cart, itemName, 1);
            } else if (action === 'decrease') {
                changeItemQuantity(cart, itemName, -1);
            }
        });
    });

    // Calculate the total price.
    const totalPrice = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    totalPriceElem.textContent = totalPrice.toFixed(2); // Show the total price of the product with 2 decimal places (00.00 SEK).
}

// Change the quantity of items in the cart.
function changeItemQuantity(cart, itemName, quantityChange) {
    // Find items in shopping cart.
    const cartItem = cart.find(item => item.name === itemName);
    if (!cartItem) return; // If the product is not found, stop working.

    // Update the current quantity of items (if none, start at 1).
    let itemQuantity = cartItem.quantity || 1;
    itemQuantity += quantityChange;

    // Check if the quantity of the item is 0/less (then remove it from the cart).
    if (itemQuantity <= 0) {
        const index = cart.indexOf(cartItem);
        if (index !== -1) {
            cart.splice(index, 1); // Remove items from cart.
        }
    } else {
        cartItem.quantity = itemQuantity; // Update new product quantity.
    }

    // Refresh the display screen.
    renderCartItems(cart); // Show new products.
    updateCartDisplay(cart); // Update new info.
}
