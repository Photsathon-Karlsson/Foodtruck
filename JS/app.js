// Set API URL and key.
const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const apiKey = "yum-vKkkQHqQboi7c6J";
const tenantId = "1bn0";

// Option for request.
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
registerTenant();

// Function to display a menu on an HTML page.
function renderMenu(menuData) { // Create "renderMenu" that uses menuData to show a menu on the screen.
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
}



// Function to create a new Tenant.
/*buttonTenant.addEventListener('click', async  () => {
	const options = {
		method: 'POST',
		body: JSON.stringify({ name: 'Photsathon' }),
		headers: {
			"Content-Type": 'application/json',
			"x-zocom": apiKey
		}
	}
	const response = await fetch(apiUrl + '/tenants', options)
	const data = await response.json()
	console.log('Tenant: ', data)
})*/

