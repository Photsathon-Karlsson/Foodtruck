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
        console.log(menuData);              
    } catch (error) {
        console.error("Error fetching menu:", error);
    }   
}

fetchMenu();