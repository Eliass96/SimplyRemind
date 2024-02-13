let output;
let searchInput;

document.addEventListener("DOMContentLoaded", function () {
    output = document.querySelector("output");
    buscador = document.getElementById("text_box_principal");
    const botonBuscar = document.getElementById("but_buscar_nota");
    botonBuscar.addEventListener("click", buscar);
    cargarRutinas();
});

function buscar() {
    const filtro = buscador.value;
    cargarRutinas(filtro);
}


async function cargarRutinas(filtro = undefined) {
    let resp;
    let url;
    if (filtro) {
        url = `/notas/${filtro}`;
    } else {
        url = "/notas";
    }
    try {
        resp = await fetch(url);
        if (!resp.ok) {
            throw new Error("Error al cargar");
        }
        const datosNotas = await resp.json();
        const html = crearRutinas({ rutinas: datosNotas });
        output.innerHTML = html;
    } catch (error) {
        console.error(error);
        alert(console.error(error));
    }
}