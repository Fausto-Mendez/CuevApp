// Datos de ejemplo para los productos
var ruta = '../PNG/noimage.png';

const productos = [
    { id: 1, nombre: 'Coca cola original 600ml', precio: 100, imagen: ruta },
    { id: 2, nombre: 'Producto 2', precio: 200, imagen: ruta },
    { id: 3, nombre: 'Producto 1', precio: 100, imagen: ruta },
    { id: 4, nombre: 'Producto 2', precio: 200, imagen: ruta },
    { id: 5, nombre: 'Producto 1', precio: 100, imagen: ruta },
    { id: 6, nombre: 'Producto 2', precio: 200, imagen: ruta },
    { id: 7, nombre: 'Producto 1', precio: 100, imagen: ruta },
    { id: 8, nombre: 'Producto 2', precio: 200, imagen: ruta },
    { id: 9, nombre: 'Producto 1', precio: 100, imagen: ruta },
    { id: 10, nombre: 'Producto 2', precio: 200, imagen: ruta },
    { id: 11, nombre: 'Producto 1', precio: 100, imagen: ruta },
    { id: 12, nombre: 'Producto 2', precio: 200, imagen: ruta },
];

// Función para inicializar y mostrar los productos
function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
    // Utiliza un fragmento de documento para mejorar el rendimiento
    let fragment = document.createDocumentFragment();

    productos.forEach((producto) => {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
        fragment.appendChild(div);
    });

    contenedorProductos.appendChild(fragment);
}

 // Obtener y mostrar la ubicación del usuario
 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    document.getElementById('user-location').textContent = "La geolocalización no es soportada por este navegador.";
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Llamada a la API de OpenWeatherMap para obtener el nombre de la ciudad
    const apiKey = 'b9b86a55f18721d938d2256593a8ade0';  // Reemplaza con tu clave API
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            const city = data.city.name;
            const locationElement = document.getElementById('user-location');
            locationElement.textContent = city;
        })
        .catch(error => {
            console.error('Error al obtener la ciudad:', error);
            document.getElementById('user-location').textContent = "No se pudo obtener la ubicación.";
        });
}

function showError(error) {
    const locationElement = document.getElementById('user-location');
    switch(error.code) {
        case error.PERMISSION_DENIED:
            locationElement.textContent = "Usuario denegó la solicitud de geolocalización.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationElement.textContent = "La información de ubicación no está disponible.";
            break;
        case error.TIMEOUT:
            locationElement.textContent = "La solicitud para obtener la ubicación ha caducado.";
            break;
        case error.UNKNOWN_ERROR:
            locationElement.textContent = "Ha ocurrido un error desconocido.";
            break;
    }
}

// Función para manejar la acción de agregar al carrito y redirigir
function agregarAlCarrito(idProducto) {
    const producto = obtenerDetallesProducto(idProducto);

    // Guarda los detalles del producto en localStorage
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));

    // Redirige a detailproducts.html
    window.location.href = '../HTML/detailsProduct.html';
}

// Inicializar la lista de productos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('productos')) {
        mostrarProductos();
    }
    if (document.getElementById('product-name')) {
        mostrarDetallesProducto();
    }
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});

// Función para obtener los detalles del producto por su ID
function obtenerDetallesProducto(idProducto) {
    return productos.find(producto => producto.id === idProducto);
}

// Función para mostrar los detalles del producto en detailproducts.html
function mostrarDetallesProducto() {
    // Recupera los detalles del producto de localStorage
    const productoSeleccionado = JSON.parse(localStorage.getItem('productoSeleccionado'));
    
    // Si hay un producto seleccionado, actualiza la información en la página
    if (productoSeleccionado) {
        document.getElementById('product-name').textContent = productoSeleccionado.nombre;
        document.getElementById('product-image').src = productoSeleccionado.imagen;
        document.getElementById('product-price').textContent = `$${productoSeleccionado.precio}`;
    }
}

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar al carrito desde detailproducts.html
document.getElementById('add-to-cart').addEventListener('click', function() {
    const producto = JSON.parse(localStorage.getItem('productoSeleccionado'));

    const existingProductIndex = cart.findIndex(item => item.id === producto.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        producto.quantity = 1;
        cart.push(producto);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
});

// Función para mostrar u ocultar los botones según el contenido del carrito
function mostrarBotones() {
    const goShoppingButton = document.getElementById('go-shopping');
    const payNowButton = document.getElementById('pay-now');

    if (cart.length === 0) {
        goShoppingButton.style.display = 'block';
        payNowButton.style.display = 'none';
    } else {
        goShoppingButton.style.display = 'none';
        payNowButton.style.display = 'block';
    }
}

// Función para renderizar el carrito en cart.html
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalContainer = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    cartTotalContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';

        let total = 0;

        cart.forEach(item => {
            total += item.precio * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="cart-item-details">
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio}</p>
                    <p>Cantidad: ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})">Eliminar</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
    }

    mostrarBotones();
}

// Función para manejar el evento de clic en el botón "Pagar"
document.getElementById('pay-now').addEventListener('click', function() {
    // Aquí podrías agregar la lógica para procesar el pago...
    alert('¡Gracias por tu compra!');
});

// Función para manejar el evento de clic en el botón "Ir a comprar"
document.getElementById('go-shopping').addEventListener('click', function() {
    // Aquí podrías agregar la lógica para redirigir al usuario a la página de productos...
    window.location.href = '../HTML/products.html';
});

function changeQuantity(productId, change) {
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity += change;

        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

  


    






