let outputNotas;
let buscadorNotas;
let botonBorrarNota;
let botonDuplicarNota;
let url_notas;

document.addEventListener("DOMContentLoaded", function () {
  outputNotas = document.getElementById("output_notas");

  outputNotaSeleccionada = document.getElementById("outputNotaSeleccionada");
  buscadorNotas = document.getElementById("text_box_principal");
  let botonBuscar = document.getElementById("but_buscar_nota");
  botonBuscar.addEventListener("click", buscar);
  document.getElementById("but_add_notas").addEventListener("click", crearNota);

  outputNotas.addEventListener("click", eliminarNotaLista);
  outputNotas.addEventListener("click", duplicarNotaLista);
  outputNotas.addEventListener("click", abrirNota);

  outputNotaSeleccionada.addEventListener("click", eliminarNota);
  outputNotaSeleccionada.addEventListener("click", duplicarNota);
  outputNotaSeleccionada.addEventListener("click", cerrarNota);
  outputNotaSeleccionada.addEventListener("click", editarNota);

  document.getElementById('ordenar_por_fecha').addEventListener('click', function () {
    cargarNotas(buscadorNotas.value, 'fecha');
  });
  document.getElementById('ordenar_por_nombre').addEventListener('click', function () {
    cargarNotas(buscadorNotas.value, 'nombre');
  });

  cargarNotas();
});

function buscar() {
  cargarNotas(buscadorNotas.value);
  let nota = document.getElementById("nota_seleccionada");
  let listado = document.getElementById("listado_notas");
  nota.style.display = "none";
  listado.style.display = "block";
}

async function cargarNotas(filtro, ordenarPor) {
  let resp;
  if (filtro) {
    url_eventos = `/notas?titulo=${filtro}`;
  } else {
    url_eventos = "/notas";
  }
  try {
    resp = await fetch(url_eventos);
    if (!resp.ok) {
      throw new Error("Error al cargar");
    }
    const datosNotas = await resp.json();
    if (ordenarPor === 'fecha') {
      datosNotas.sort((a, b) => (a.fecha < b.fecha) ? 1 : ((b.fecha < a.fecha) ? -1 : 0));
    } else {
      datosNotas.sort((a, b) => (a.titulo > b.titulo) ? 1 : ((b.titulo > a.titulo) ? -1 : 0));
    }
    const html = crearNotas({ notas: datosNotas });
    outputNotas.innerHTML = html;
  } catch (error) {
    alert(error);
  }
}

async function abrirNota(evt) {
  if (evt.target.classList.contains("todas_las_notas")) {
    const item = evt.target.closest("li.todas_las_notas");
    const id = item.dataset.idNota;
    const resp = await fetch("/notas", { method: "GET" });
    if (resp.ok) {
      cargarNotaSeleccionada(id);
      let nota = document.getElementById("nota_seleccionada");
      let listado = document.getElementById("listado_notas");
      nota.style.display = "block";
      listado.style.display = "none";
    }
  }
}

async function cargarNotaSeleccionada(idNota) {
  let resp;
  url_eventos = `/notas/${idNota}`;
  console.log(url_eventos);
  try {
    resp = await fetch(url_eventos);
    if (!resp.ok) {
      throw new Error("Error al cargar");
    }
    const datosNota = await resp.json();
    const html = vistaNotaSeleccionada(datosNota);
    outputNotaSeleccionada.innerHTML = html;
  } catch (error) {
    alert(error);
  }
}

function cerrarNota(evt) {
  if (evt.target.classList.contains("but_volver_al_listado")) {
    cargarNotas(buscadorNotas.value);
    let nota = document.getElementById("nota_seleccionada");
    let listado = document.getElementById("listado_notas");
    nota.style.display = "none";
    listado.style.display = "block";
  }
}

async function eliminarNotaLista(evt) {
  if (evt.target.classList.contains("but_eliminar_nota_lista")) {
    const item = evt.target.closest("li.todas_las_notas");
    const id = item.dataset.idNota;

    Swal.fire({
      title: "¿Estás seguro de que deseas eliminar esta nota?",
      text: "Si la eliminas no la podrás recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await fetch(`/notas/${id}`, { method: "DELETE" });
        if (resp.ok) {
          cargarNotas(buscadorNotas.value);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Nota eliminada",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Error al eliminar la nota.",
          });
        }
      }
    });
  }
}

async function eliminarNota(evt) {
  if (evt.target.classList.contains("but_eliminar_nota")) {
    const item = evt.target.closest("#outputNotaSeleccionada");
    console.log(item);
    const id = item.dataset.idNota;
    console.log(id);

    Swal.fire({
      title: "¿Estás seguro de que deseas eliminar esta nota?",
      text: "Si la eliminas no la podrás recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await fetch(url_eventos, { method: "DELETE" });
        if (resp.ok) {
          cargarNotas(buscadorNotas.value);
          let nota = document.getElementById("nota_seleccionada");
          let listado = document.getElementById("listado_notas");
          nota.style.display = "none";
          listado.style.display = "block";
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Nota eliminada",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Error al eliminar la nota.",
          });
        }
      }
    });
  }
}

async function duplicarNotaLista(evt) {
  if (evt.target.classList.contains("but_duplicar_nota_lista")) {
    const item = evt.target.closest("li.todas_las_notas");
    const id = item.dataset.idNota;
    const resp = await fetch(`/notas/${id}`, { method: "GET" });
    if (resp.ok) {
      const nota = await resp.json();
      console.log(nota);
      let nuevaNota = {
        titulo: nota.titulo + " (copia)",
        texto: nota.texto,
        etiquetas: nota.etiquetas,
      };
      const respDuplicar = await fetch("/notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaNota),
      });
      if (respDuplicar.ok) {
        cargarNotas(buscadorNotas.value);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Nota duplicada",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Error al duplicar la nota.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Error al duplicar la nota.",
      });
    }
  }
}

async function duplicarNota(evt) {
  if (evt.target.classList.contains("but_duplicar_nota")) {
    const item = evt.target.closest("section.nota_seleccionada");
    const id = item.dataset.idNota;
    const resp = await fetch(url_eventos, { method: "GET" });
    if (resp.ok) {
      const nota = await resp.json();
      console.log(nota);
      let nuevaNota = {
        titulo: nota.titulo + " (copia)",
        texto: nota.texto,
        etiquetas: nota.etiquetas,
      };
      const respDuplicar = await fetch("/notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaNota),
      });
      if (respDuplicar.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Nota duplicada",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Error al duplicar la nota.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Error al duplicar la nota.",
      });
    }
  }
}

async function crearNota() {
  let nuevaNota = {
    titulo: "Nueva nota",
    texto: "Introduce el texto de tu nota...",
    etiquetas: []
  };
  const resp = await fetch("/notas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaNota),
  });
  if (resp.ok) {
    cargarNotas(buscadorNotas.value);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Nota creada",
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Ups...",
      text: "Error al crear la nota.",
    });
  }
}

async function editarNota(evt) {
  if (evt.target.classList.contains("but_editar_nota")) {
    const item = evt.target.closest("#outputNotaSeleccionada");
    const resp = await fetch(url_eventos, { method: "GET" });

    if (resp.ok) {
      const nota = await resp.json();
      console.log(nota);
      let nuevaNota = {
        titulo: item.dataset.titulo,
        texto: item.dataset.texto,
        etiquetas: item.dataset.etiquetas,
      };
      const respEditar = await fetch(url_eventos, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaNota),
      });
      if (respEditar.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cambios guardados",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Error al guardar los cambios.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Error al guardar los cambios.",
      });
    }
  }
}
