// Set API URL and key.
const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const apiKey = "yum-vKkkQHqQboi7c6J";
let tenantId;

// ( Page 1 : menu ) : The user can click & choose items to shopping cart.
    // - Show list of menu & button for adding item to shopping cart.

// Option for request.
const options = {
    method: 'POST',
    headers: {
        "Content-Type": 'application/json',  // Send JSON in body.
        "x-zocom": apiKey  // API key.
    },

    body: JSON.stringify({ name: 'Koi' }), // Covert to JSON string.
};

//Function to register Tenant
async function registerTenant(){ 
    try{
        const response = await fetch(apiUrl + "tenants", options); // Call API.
        const data = await response.json(); // Convert to JSON.
        console.log("Tenant registered successfully: ", data);
        if (data.id !== undefined){
            tenantId = data.id; // Save tenant ID, If new name.
        } else {
            tenantId = "1bn0"; // Default tenant ID. (for name 'Koi')
        }
    } catch(error) {
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
// registerTenant();

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

    // Reset (old) HTML.
    foodMenu.innerHTML = '';
    sauceMenu.innerHTML = '';
    drinkMenu.innerHTML = '';
    // Remove (old) info and create the new menu. 
    menuData.forEach(item => {
    // Create <li> for all menus.
    const menuItem = document.createElement('li');
    menuItem.classList.add('menu-item');
    let ingredientsHTML = '';
    let priceHTML = '';

   // Show price & ingredients only for wontons.
   if (item.type === 'wonton') {
    priceHTML = `<span class="item-price"> ${item.price || 'N/A'} SEK</span>`;
    } else if (item.type !== 'drink' && item.type !== 'dip') {
        priceHTML = `<span class="item-price"> ${item.price || 'N/A'} SEK</span>`;
    }

    // Remove ingredients & price for dips & drinks.
    if (item.type !== 'drink' && item.type !== 'dip') {
        ingredientsHTML = `<p class="item-ingredients">${item.ingredients || 'Ingen beskrivning'}</p>`;
    }

        // Create HTML lists for menu. 
        menuItem.innerHTML = `
            <div class="item-header">
                <span class="item-name">${item.name}</span>
                ${priceHTML} 
            </div>
            ${ingredientsHTML}
        `;

        // Add event listener for items.
        const itemName = menuItem.querySelector('.item-name');
        itemName.addEventListener('click', () => {
            // Add items in shopping cart. 
              const existingItem = cart.find(i => i.id === item.id);
              if (existingItem) {
                existingItem.quantity += 1;
            } else {
              cart.push({ ...item, quantity: 1 });
            }
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
        showCart(); // Show the shopping cart.
        renderCartItems(cart); // Render the shopping cart details on Page 2.
    });

    // Event listener to show Page 1 when clicking the "Back" button.
    const backButton = document.querySelector('.closeCart');
    backButton.addEventListener('click', () => {
      showMenu(); // Show the shopping cart.
  });

    // Event listener to show Page 3 when clicking the "Order" button.
    const orderButton = document.querySelector('.checkout-button');
    orderButton.addEventListener('click', () => {
      showOrder(); // Show the order.
      submitOrder(cart); // Submit the order.
    });

    // Event listener to show Page 4 when clicking the "Receipt" button.
    const receiptButton = document.querySelector('.receipt-button');
    receiptButton.addEventListener('click', () => {
        showReceipt(); // Show the receipt.
    });

    // Event listener to show Page 1 when clicking the "new order button" button.
    const newOrderButton = document.querySelectorAll('.new-order-button');
    newOrderButton.forEach(e => e.addEventListener('click', () => {
        backToMenu(); // Show the menu.

        cart.length = 0; // Clear the shopping cart.
        updateCartDisplay(cart); // Update the shopping cart.
    }));
  }

// ( Page 2 : Shopping Cart ) : the user can see all chosen item / can change quantity of item.
  // - Show chosen item.
  // - The user can change quantity of item. 

// Update the display of the shopping cart.
function updateCartDisplay(cart) {
    const cartItemCount = document.getElementById('cart-item-count');
    const cartDetailsButton = document.getElementById('cart-details-button');
    
    // Show the total number of items in the cart.
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    // Show/Hide the cart details button.
    if (cart.length > 0) {
        cartItemCount.textContent = `${totalItems}`;
        cartItemCount.classList.add('have-items');
        cartDetailsButton.classList.remove('hidden');
    } else {
        cartItemCount.textContent = '';
        cartItemCount.classList.remove('have-items');
        cartDetailsButton.classList.add('hidden');
    }
}

// Show the items in the shopping cart on page 2.
function renderCartItems(cart) {
    const cartItemsList = document.querySelector('.cart-items');
    const totalPriceElem = document.querySelector('.total-price');    

    // Combine the same items in the cart.
    const uniqueCart = cart.reduce((acc, item) => { // Use "reduce function" to process items in shopping cart & make same chosen item into 1 list.
      const existingItem = acc.find(i => i.id === item.id); // Check current item.
      if (existingItem) {
          existingItem.quantity += 1; // Add +1 for the same chosen item.
      } else {
          acc.push({ ...item, quantity: item.quantity || 1 }); // Add new item & quantity.
      }
      return acc; // accumulator (collect)
  }, []);

    // Remove (old) items.
    cartItemsList.innerHTML = '';
    // Create (new) items.
    uniqueCart.forEach(item => {
        const cartItem = document.createElement('li'); // Creat new element <li> & keep it in variable "cartItem".
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div>
                <span class="item-name">${item.name}</span>
                  <div class="item-controls">
                    <button class="control-button" data-action="increase" data-item="${item.name}"> + </button>
                    <span class="item-quantity">${item.quantity} stycken </span>
                    <button class="control-button" data-action="decrease" data-item="${item.name}"> - </button>
                  </div>
            </div>
            <span class="item-price">${item.price} SEK</span> 
        `;
        cartItemsList.appendChild(cartItem);
    });

    // Add Event Listener for (+ -) items. 
    const controlButtons = cartItemsList.querySelectorAll('.control-button');
    controlButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.getAttribute('data-action'); // Use "e.target" for get value of "data-action".
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

// Change the quantity of items in shopping cart.
function changeItemQuantity(cart, itemName, quantityChange) {
    // Find items in shopping cart.
    const cartItem = cart.find(item => item.name === itemName);
    if (!cartItem) return; // If the product is not found, stop working.

    // Update the current quantity of items (if none, start at 1).
    let itemQuantity = cartItem.quantity || 1;  //should not have a field called quantity. This should be handled by checking the array and counting each instance with the same ID or Name for visualisation and each one should have it´s own element in the array to be able to order several of the same dish.
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
    console.log(cart);
}


async function submitOrder(cart) {
  const orderData = {
    items: cart.map((item) => item.id),
  };

  try {
    const response = await fetch(`${apiUrl}${tenantId}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
      body: JSON.stringify(orderData),
    });

    const receipt = await response.json();
    displayReceipt(receipt);
  } catch (error) {
    console.error("Order error", error);
  }
}

// ( Page 3 : Order ) : Send order to API / when get answer from API, show chosen item ID & have choice to start order again.
    // - Send Post Request with order info to API.
    // - Show order ID that return.

function displayReceipt(receipt) {
  console.log(receipt)
  const eta = document.querySelector('.eta');
  
  // Convert eta & timestamp to Date objects.
  const etaTime = new Date(receipt.order.eta);
  const timestampTime = new Date(receipt.order.timestamp);
  
  // Calculate the difference in milliseconds.
  const timeDifference = etaTime - timestampTime;

  if (timeDifference > 0) {
    // Convert milliseconds to minutes & seconds.
    const minutes = Math.floor(timeDifference / 60000); // 1 minute = 60000 ms
    const seconds = Math.floor((timeDifference % 60000) / 1000); // Remaining seconds

    // Display the result in "minutes.seconds" format.
    eta.textContent = `ETA ${minutes} MINS ${seconds} SECONDS`;
  } else {
    // If the time difference is negative.
    eta.textContent = "ETA 5 MINS";
  }

// ( Page 4 : Receipt ) : Show reciept from API / have button to go back to menu.
  // - Get receipt from API.
  // - Add function to go back to menu.

  const receiptContainer = document.querySelector(".receipt");
  const receiptId = receiptContainer.querySelector(".receipt-code");
  const itemsContainer = receiptContainer.querySelector(".items");

  receiptId.textContent = receipt.order.id;

  // Reset old items in receipt.
  itemsContainer.innerHTML = "";

  // Combine the same items in the cart.
  const uniqueItems = receipt.order.items.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Add new items to receipt.
  uniqueItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
      <div class="item-details">
        <span class="item-name">${item.name}</span>
          <div class="item-controls">
            <span class="item-quantity">${item.quantity} stycken </span>
          </div>
      </div>
      <span class="item-price">${item.price} SEK </span>
    `;

    itemsContainer.appendChild(itemElement);
  });
  
  // Add total price to receipt.
  const totalElement = document.createElement("div");
  totalElement.classList.add("total");
  totalElement.innerHTML = `
    <div class="total-labels">
      <span> TOTALT </span>
        <div class="tax">
          <span class="tax"> inkl 20% moms </span>
        </div>
    </div>
    <span class="total-price"> ${receipt.order.orderValue} </span> SEK
  `;
  itemsContainer.appendChild(totalElement);
}

function showCart() {
  document.querySelector(".page1-menu").style.display = "none";
  document.querySelector(".page2-shoppingCart").style.display = "block";
}

function showMenu() {
  document.querySelector(".page1-menu").style.display = "block";
  document.querySelector(".page2-shoppingCart").style.display = "none";
}

function showOrder() {
  document.querySelector(".page2-shoppingCart").style.display = "none";
  document.querySelector(".page3-order").style.display = "block";
}

function showReceipt() {
  document.querySelector(".page3-order").style.display = "none";
  document.querySelector(".page4-receipt").style.display = "block";
}

function backToMenu() {
  document.querySelector(".page3-order").style.display = "none";
  document.querySelector(".page4-receipt").style.display = "none";
  document.querySelector(".page1-menu").style.display = "block";
} 
