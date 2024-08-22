// Array para almacenar los productos en el carrito
let cart = [];

// Función para actualizar el carrito en la UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    // Limpiar la lista del carrito
    cartItems.innerHTML = '';
    
    // Añadir cada producto del carrito a la lista
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.textContent = 'Eliminar';
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            updateCartUI();
        };
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });
    
    // Calcular el total del carrito
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

// Función para añadir un producto al carrito
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

// Asignar los eventos a los botones "Añadir al Carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const name = event.target.getAttribute('data-name');
        const price = parseFloat(event.target.getAttribute('data-price'));
        addToCart(name, price);
    });
});

// Asignar evento al botón "Proceder al Pago" para abrir el modal de pago
document.getElementById('proceed-to-checkout').addEventListener('click', () => {
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
});

// Evento de envío del formulario de pago
document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('¡Pedido confirmado! Gracias por su compra.');
    // Limpiar el carrito después de la compra
    cart = [];
    updateCartUI();
    // Cerrar el modal de pago
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    checkoutModal.hide();

let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        updateCartDisplay();
    });
});

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Proceder al Pago
document.getElementById('proceed-to-checkout').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    const order = {
        name,
        email,
        address,
        paymentMethod,
        cart,
        total: document.getElementById('cart-total').textContent
    };

    // Enviar el pedido al servidor
    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    }).then(response => response.json()).then(data => {
        console.log('Pedido realizado con éxito', data);
        cart = [];
        updateCartDisplay();
        alert('Pedido realizado con éxito');
    });
});
});