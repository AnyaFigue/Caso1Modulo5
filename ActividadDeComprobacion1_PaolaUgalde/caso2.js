// Variables globales
let cart = [];

// Inicializa el carrito desde localStorage
function init() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        renderCart();
    }
}

// Función para agregar un producto al carrito
function addProduct(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);

    // Validación de datos
    if (!name || isNaN(price) || isNaN(quantity) || quantity <= 0 || price < 0) {
        alert('Por favor, ingrese datos válidos.');
        return;
    }

    const product = {
        name,
        price,
        quantity,
        total: price * quantity
    };

    cart.push(product);
    saveToLocalStorage();
    renderCart();
    clearForm();
}

// Función para renderizar el carrito en la tabla
function renderCart() {
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = ''; // Limpia la tabla antes de renderizar

    let totalGeneral = 0;

    cart.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>${product.total.toFixed(2)}</td>
            <td><button onclick="removeProduct(${index})">Eliminar</button></td>
        `;
        
        cartTableBody.appendChild(row);
        totalGeneral += product.total; // Suma el total de cada producto
    });

    document.getElementById('totalGeneral').innerText = totalGeneral.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeProduct(index) {
    cart.splice(index, 1); // Elimina el producto del carrito
    saveToLocalStorage();
    renderCart();
}

// Función para guardar el carrito en localStorage
function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productQuantity').value = '';
}

// Función para finalizar la compra
function finalizePurchase() {
    if (cart.length === 0) {
        alert('El carrito está vacío. No se puede finalizar la compra.');
        return;
    }
    // Aquí puedes implementar la lógica para finalizar la compra (por ejemplo, enviar datos a un servidor)
    alert('Compra finalizada. Gracias por su compra!');
    cart = []; // Vacía el carrito
    saveToLocalStorage();
    renderCart();
}

// Vincula el evento de envío del formulario
document.getElementById('productForm').addEventListener('submit', addProduct);

// Vincula el evento del botón de finalizar compra
document.getElementById('finalizePurchase').addEventListener('click', finalizePurchase);

// Llama a la función init al cargar la página
window.onload = init;