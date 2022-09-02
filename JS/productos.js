async function dibujarProductos(productos) {
    const catalogo = document.getElementById("productos");

    catalogo.innerHTML = "";

    productos.forEach((producto) => {
        const div = document.createElement("div");

        div.classList.add("card");

        div.innerHTML = `
        <img src="./${producto.imagen.src}" alt="${producto.imagen.alt}" />
        <div class="card-body text-center">
            <h4>${producto.nombre}</h4>
            <p class="card-text text-center">
                ${producto.descripcion}
            </p>
            <strong>$
                ${producto.precio}
            </strong>
        </div>
        `;

        const boton = document.createElement("button");

        boton.classList.add("button-nav");

        boton.innerText = "Añadir al carrito";

        div.append(boton);

        boton.addEventListener("click", async () => {
            agregarAlCarrito(producto);

            const { isConfirmed = false, isDismissed = false } =
                await Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `Agregaste "${producto.nombre}" a tu carrito.`,
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Finalizar compra",
                    cancelButtonText: `Seguir comprando`,
                });

            if (isConfirmed) {
                window.location.href = "./pages/carrito.html";
            }
        });

        catalogo.append(div);
    });

    let botonBuscar = document.getElementById("BotonBuscar");
}

(async () => {
    let productos = [];

    try {
        const response = await fetch("./data.json");
        productos = await response.json();
    } catch (error) {
        console.log(error);
    }

    dibujarProductos(productos);

    let buscador = document.getElementById("buscador");

    buscador.addEventListener("submit", (event) => {
        event.preventDefault();

        const texto = event.target.texto.value.toLowerCase();

        dibujarProductos(
            texto
                ? productos.filter((producto) =>
                      producto.nombre.toLowerCase().includes(texto)
                  )
                : productos
        );
    });
})();
