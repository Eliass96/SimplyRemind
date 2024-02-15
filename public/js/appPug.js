let outputNotas;
let buscadorNotas;

document.addEventListener("DOMContentLoaded", function () {
    outputNotas = document.querySelector("output");
    buscadorNotas = document.getElementById("text_box_principal");
    const botonBuscar = document.getElementById("but_buscar_nota");
    botonBuscar.addEventListener("click", buscar);

    outputNotas.addEventListener("click", eliminarNota);

    cargarNotas();
});

function buscar() {
    cargarNotas(buscadorNotas.value);
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
        outputNotas.innerHTML = html;
    } catch (error) {
        alert(error + url);
    }
}

async function eliminarNota(evt) {
    if (evt.target.classList.contains("but_eliminar_nota_lista")) {
        const item = evt.target.closest("li.todas_las_notas");
        const id = item.dataset.idNota;
        if (confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
            const resp = await fetch(`/notas/${id}`, { method: "DELETE" });
            if (resp.ok) {
                cargarNotas(buscadorNotas.value);
                console.log("Elemento eliminado exitosamente");
            } else alert("Error!!!!");
        } else {
            console.log("Eliminación cancelada");
        }
    }
}