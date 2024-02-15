let output;
let buscador;

document.addEventListener("DOMContentLoaded", function () {
    output = document.querySelector("output");
    buscador = document.getElementById("text_box_principal");
    const botonBuscar = document.getElementById("but_buscar_nota");
    botonBuscar.addEventListener("click", buscar);

    output.addEventListener("click", outputNotaClicado);

    cargarNotas();
});

function buscar() {
    cargarNotas(buscador.value);
}


async function cargarNotas(filtro) {
    let resp;
    let url;
    if (filtro) {
        url = `/notas?titulo=${filtro}`;
    } else {
        url = "/notas";
    }
    try {
        resp = await fetch(url);
        if (!resp.ok) {
            throw new Error("Error al cargar");
        }
        const datosNotas = await resp.json();
        const html = crearNotas({ notas: datosNotas });
        output.innerHTML = html;
    } catch (error) {
        alert(error + url);
    }
}

async function outputNotaClicado(evt) {
    if (evt.target.classList.contains("but_eliminar_nota_lista")) {
        const item = evt.target.closest(".todas_las_notas");
        const id = item.getAttribute("idNota");
        console.log(id);
        if (confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
            const resp = await fetch(`/notas/${id}`, { method: "DELETE" });
            if (resp.ok) {
                cargarNotas(buscador.value);
                console.log("Elemento eliminado exitosamente");
            } else alert("Error!!!!");
        } else {
            console.log("Eliminación cancelada");
        }
    }
}