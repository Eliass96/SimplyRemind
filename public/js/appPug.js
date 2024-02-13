let output;
let buscador;

document.addEventListener("DOMContentLoaded", function () {
    output = document.querySelector("output");
    buscador = document.getElementById("text_box_principal");
    const botonBuscar = document.getElementById("but_buscar_nota");
    botonBuscar.addEventListener("click", buscar);
    cargarNotas();
});

function buscar() {
    cargarNotas(buscador.value);
}


async function cargarNotas(filtro) {
    let resp;
    let url;
    console.log(filtro);
    if (filtro) {
        url = `/notas?titulo=${filtro}`;
    } else {
        url = "/notas";
    }
    console.log(url);
    try {
        resp = await fetch(url);
        if (!resp.ok) {
            throw new Error("Error al cargar");
        }
        const datosNotas = await resp.json();
        const html = crearNotas({ notas: datosNotas });
        output.innerHTML = html;
        console.log(url);
    } catch (error) {
        console.error(error);
        alert(error + url);
    }
}