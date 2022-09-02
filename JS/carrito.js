async function eliminarProducto(producto) {
    const resultado = await Swal.fire({
        title: `¿Estás seguro de que deseas eliminar "${producto.nombre}" de tu carrito?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Eliminar producto",
        cancelButtonText: `Cancelar`,
    });

    if (resultado.isConfirmed) {
        eliminarDelCarrito(producto);

        dibujarCarrito();
        dibujarTotal();

        return true;
    }

    return false;
}

async function modificarCantidad(producto, cantidad) {
    const carrito = obtenerCarrito();

    cantidad = Math.floor(cantidad);

    if (cantidad < 1) {
        const productoEliminado = await eliminarProducto(producto);

        if (productoEliminado) {
            return;
        }

        carrito[producto.id].cantidad = 1;
    } else if (cantidad > producto.stock) {
        carrito[producto.id].cantidad = producto.stock;
    } else {
        carrito[producto.id].cantidad = cantidad;
    }

    escribirCarrito(carrito);

    dibujarCarrito();
    dibujarTotal();
}

function dibujarCarrito() {
    const productos = Object.values(obtenerCarrito());

    const contenedorDeCarrito = document.getElementById("Carrito");

    contenedorDeCarrito.innerHTML = "";

    for (const producto of productos) {
        const contenedorDeProducto = document.createElement("tr");

        contenedorDeProducto.innerHTML = `
            <td><img src="../${
                producto.imagen.src
            }"  class="img-thumbnail w-50" alt="${producto.imagen.alt}" /></td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio * producto.cantidad}</td>`;

        const inputTD = document.createElement("td");
        const botonTD = document.createElement("td");
        const inputDeCantidad = document.createElement("input");
        const boton = document.createElement("button");

        inputDeCantidad.type = "number";
        inputDeCantidad.value = producto.cantidad;
        inputDeCantidad.classList.add("cantidad");

        boton.innerText = "Eliminar del carrito";
        boton.classList.add("button-nav");

        inputTD.append(inputDeCantidad);
        contenedorDeProducto.append(inputTD);

        botonTD.append(boton);
        contenedorDeProducto.append(botonTD);

        inputDeCantidad.addEventListener("change", (e) => {
            const cantidad = Number(isNaN(e.target.value) ? 0 : e.target.value);

            modificarCantidad(producto, cantidad);
        });
        boton.addEventListener("click", () => eliminarProducto(producto));

        contenedorDeCarrito.appendChild(contenedorDeProducto);
    }
}

function dibujarTotal() {
    document.getElementById("total").innerText = `$ ${obtenerTotal()}`;
}

document
    .getElementById("FinalizarCompra")
    .addEventListener("click", async () => {
        await Swal.fire(`Compra por $${obtenerTotal()} finalizada!`);

        vaciarCarrito();

        dibujarCarrito();
        dibujarTotal();
    });

dibujarCarrito();
dibujarTotal();
