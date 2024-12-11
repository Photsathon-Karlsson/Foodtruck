// Set API URL and key.
const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const apiKey = "yum-vKkkQHqQboi7c6J";

// Function to fetch menu from API (by using "async").
async function fetchMenu() {
    try { // Using "try" to handles errors.
        const response = await fetch(`${apiUrl}menu`, { // Send request to get info from API by using "fetch". 
            method: 'GET', // Using medthod "GET" to get info from API.
            headers: { // "Headers" = sections that request information from API.
                "x-zocom": apiKey // Sending API key to verify the user's identity.
            }
        });
        const menuData = await response.json(); // Conversion of the data returned from the API (response) into the form of a JS Object or Array.
        console.log(menuData); 
        renderMenu (menuData.items);              
    } catch (error) { // Checking errors.
        console.error("Error fetching menu:", error);
    }   
}
fetchMenu();

// Function to display a menu on an HTML page.
function renderMenu(menuData) {
    const menuContainer = document.getElementById('menu-container');

    // remove old info. 
    menuContainer.innerHTML = `
        <h1 class="menu-title"> MENY </h1>
        <div class="menu-section"></div>
    `;

    const menuSection = menuContainer.querySelector('.menu-section');

    // Loop for menu.
    menuData.forEach(item => {
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
}

// Call the fetch function when the page loads.