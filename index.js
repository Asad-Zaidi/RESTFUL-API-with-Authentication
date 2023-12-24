document.addEventListener("DOMContentLoaded", fetchProducts);
// let API_URL = "http://localhost:3000/api/products";
// let API_URL = "mongodb+srv://asad:1410@cluster0.wrbiuck.mongodb.net/test";
let API_URL = "https://restful-api-mongo-db.vercel.app/api/products";

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        let productCardsHTML = '';
        products.forEach((product) => {
            productCardsHTML += `
            <div class="product" data-id="${product._id}">
            <h3>Name: ${product.title}</h3>
            <p>Model: ${product.Model}</p>
            <p>Price: ${product.price}</p>
            <button onclick="handleDelete(this)">Delete</button>
            <button onclick="openEditForm(); handleUpdate(this)">Edit</button>
        </div>`;
        });
        document.getElementById('products').innerHTML = productCardsHTML;

    } catch (error) {
        console.error("Error while fetching products:", error);
    }
}

function addProduct() {
    let title = document.getElementById('title').value;
    let Model = document.getElementById('model').value;
    let price = document.getElementById('price').value;
    if (!title || !Model || !price) return alert('All fields are required');

    let product = {
        title,
        Model,
        price
    };
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').value = '';
            document.getElementById('model').value = '';
            document.getElementById('price').value = '';
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function handleDelete(element) {
    let productElement = element.closest('.product');
    if (!productElement) {
        console.error('Product element not found');
        return;
    }
    let id = productElement.getAttribute('data-id');
    if (!id) {
        console.error('Product ID not found');
        return;
    }
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function handleUpdate(element) {
    let productElement = element.closest('.product');
    if (!productElement) {
        console.error('Product element not found');
        return;
    }
    let id = productElement.getAttribute('data-id');
    if (!id) {
        console.error('Product ID not found');
        return;
    }
    document.getElementById('editForm').setAttribute('data-id', id);
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();
    document.getElementById('editTitle').value = product.title;
    document.getElementById('editModel').value = product.Model;
    document.getElementById('editPrice').value = product.price;

    openEditForm();
}


function submitEditForm() {
    let id = document.getElementById('editForm').getAttribute('data-id');
    let title = document.getElementById('editTitle').value;
    let Model = document.getElementById('editModel').value;
    let price = document.getElementById('editPrice').value;

    if (!title || !Model || !price) {
        alert('All fields are required');
        return;
    }

    let product = {
        title,
        Model,
        price
    };

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => {
            closeEditForm();
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function openEditForm() {
    document.getElementById('editForm').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeEditForm() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('editForm').style.display = 'none';
}

document.body.innerHTML += '<div id="overlay" class="overlay"></div>';


function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}