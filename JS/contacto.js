const formulario = document.getElementById("FormularioDeContacto");

formulario._next.value = `${window.location.href}#email-sent`;

if (window.location.href.endsWith("#email-sent")) {
    Swal.fire(
        "Gracias por contactarnos. En breve nos comunicaremos con usted."
    );
}
