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

// Function showing menu & add items to shopping cart. 
function renderMenu(menuData) {
    const foodMenu = document.getElementById('food-menu');
    const sauceMenu = document.getElementById('sauce-menu');
    const drinkMenu = document.getElementById('drink-menu');
    const cart = []; // Array for keeping items added in shopping cart. 

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

        // Add discriptions (not for drinks). 
        if (item.type !== 'drink') {
            descriptionHTML = `<p class="item-description">${item.description || 'Ingen beskrivning'}</p>`;
        }

        // Create HTML lists of menu. 
        menuItem.innerHTML = `
            <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.price || 'N/A'} SEK</span> 
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
}

// Function for update shopping cart. 
function updateCartDisplay(cart) {
    // Get the element showing number of items in shopping cart & update.
    const cartItemCount = document.getElementById('cart-item-count');
    cartItemCount.textContent = `: ${cart.length} artiklar`;
    
    // Check if cart-count element is in DOM.
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        // Change background color of cart-count.
        cartCount.style.backgroundColor = 'white';
        console.log("Found element cart-count & changed BG color");
    } else {
        // If not found cart-count.
        console.log("Not found cart-count");
    }
}

// Page : 2 Shopping Cart



