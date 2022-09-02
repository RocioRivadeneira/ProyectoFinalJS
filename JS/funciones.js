function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || {};
}

function escribirCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function obtenerTotal() {
    return Object.values(obtenerCarrito()).reduce(
        (total, { precio, cantidad }) => (total += precio * cantidad),
        0
    );
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();

    if (producto.id in carrito) {
        const productoEnCarrito = carrito[producto.id];

        if (productoEnCarrito.cantidad < producto.stock) {
            carrito[producto.id].cantidad++;
        } else {
            productoEnCarrito.cantidad = producto.stock;
        }
    } else {
        carrito[producto.id] = { ...producto, cantidad: 1 };
    }

    escribirCarrito(carrito);
}

function eliminarDelCarrito(producto) {
    // Destructuring + spread para eliminar un ID del carrito.
    const { [producto.id]: eliminado = null, ...carrito } = obtenerCarrito();

    escribirCarrito(carrito);
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
}
