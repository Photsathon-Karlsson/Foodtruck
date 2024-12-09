// Set API URL and key
const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const apiKey = "yum-vKkkQHqQboi7c6J";

// Function to fetch menu from API
async function fetchMenu() {
    try {
        const response = await fetch(`${apiUrl}menu`, {
            method: 'GET',
            headers: {
                "x-zocom": apiKey
            }
        });
        const menuData = await response.json();
        displayMenu(menuData);
    } catch (error) {
        console.error("Error fetching menu:", error);
    }
}

// Function to display menu in DOM.
function displayMenu(menu) {
    const menuList = document.querySelector('.menu-list');
    menuList.innerHTML = ""; // Clear the list first.
    menu.items.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.price} SEK</span>
            </div>
            <p class="item-description">${item.description}</p>
            <button class="add-to-cart" data-id="${item.id}" data-price="${item.price}" data-name="${item.name}">add</button>`;
        menuList.appendChild(menuItem);
    });

    // Add event listener to add to cart button.
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Function for adding products to the cart.
let cart = [];

function addToCart(event) {
    const button = event.target;
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartView();
}

// Function to update the cart view.
function updateCartView() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ""; // Clear the list first.

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price} SEK</span>
            <div class="item-controls">
                <button class="control-button" data-id="${item.id}" data-action="increase">+</button>
                <span class="item-quantity">${item.quantity} stycken</span>
                <button class="control-button" data-id="${item.id}" data-action="decrease">-</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotalPrice();
    attachCartControlEvents();
}

// Function to calculate the total price.
function updateTotalPrice() {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.querySelector('.total-price').textContent = totalPrice.toFixed(2) + " SEK";
}

// Function to increase/decrease quantity in cart.
function attachCartControlEvents() {
    document.querySelectorAll('.control-button').forEach(button => {
        button.addEventListener('click', handleCartControl);
    });
}

function handleCartControl(event) {
    const button = event.target;
    const id = button.getAttribute('data-id');
    const action = button.getAttribute('data-action');
    const item = cart.find(item => item.id === id);

    if (action === "increase") {
        item.quantity += 1;
    } else if (action === "decrease" && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== id);
    }

    updateCartView();
}

// Function for ordering.
async function placeOrder() {
    try {
        const order = {
            items: cart,
            tenant: "student_name" // Replace with name.
        };

        const response = await fetch(`${apiUrl}orders`, {
            method: 'POST',
            headers: {
                "x-zocom": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        });

        const orderData = await response.json();
        alert(`สั่งซื้อสำเร็จ! Order ID: ${orderData.id}`);
        cart = []; // Empty your cart after ordering.
        updateCartView();
    } catch (error) {
        console.error("Error placing order:", error);
    }
}

// Event listener for the order button.
document.querySelector('.checkout-button').addEventListener('click', placeOrder);

// Call the fetchMenu function when the app loads.
fetchMenu();
