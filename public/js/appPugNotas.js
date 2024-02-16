let outputNotas;
let buscadorNotas;

document.addEventListener("DOMContentLoaded", function () {
  outputNotas = document.querySelector("output");
  outputNotaSeleccionada = document.getElementById("outputNotaSeleccionada");
  buscadorNotas = document.getElementById("text_box_principal");
  let botonBuscar = document.getElementById("but_buscar_nota");
  botonBuscar.addEventListener("click", buscar);
  document.getElementById("but_add_notas").addEventListener("click", crearNota);


  outputNotas.addEventListener("click", eliminarNota);
  outputNotas.addEventListener("click", duplicarNota);
  //outputNotas.addEventListener("click", abrirNota);

  document.getElementById('ordenar_por_fecha').addEventListener('click', function() {
    cargarNotas(buscadorNotas.value, 'fecha');
  });
  
  document.getElementById('ordenar_por_nombre').addEventListener('click', function() {
    cargarNotas(buscadorNotas.value, 'nombre');
  });

  cargarNotas();
});

function buscar() {
  cargarNotas(buscadorNotas.value);
  /*let nota = document.getElementById("nota_seleccionada");
  let listado = document.getElementById("listado_notas");
  nota.style.display = "none";
  listado.style.display = "block";*/
}

async function cargarNotas(filtro, ordenarPor) {
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
    if (ordenarPor === 'fecha') {
      datosNotas.sort((a, b) => (a.fecha < b.fecha) ? 1 : ((b.fecha < a.fecha) ? -1 : 0));
    } else {
      datosNotas.sort((a, b) => (a.titulo > b.titulo) ? 1 : ((b.titulo > a.titulo) ? -1 : 0));
    }
    const html = crearNotas({ notas: datosNotas });
    outputNotas.innerHTML = html;
  } catch (error) {
    alert(error + url);
  }
}

/*async function cargarNotaSeleccionada(idNota) {
  let resp;
  let url = `/notas/${idNota}`;
  console.log(url);
  try {
    resp = await fetch(url);
    console.log(resp);
    if (!resp.ok) {
      throw new Error("Error al cargar");
    }
    const datosNota = await resp.json();
    console.log(datosNota);
    const html = vistaNotaSeleccionada({ vistanota: datosNota });
    console.log(html);
    outputNotaSeleccionada.innerHTML = html;
  } catch (error) {
    alert(error);
    console.log(error);
  }
}*/

async function eliminarNota(evt) {
  if (evt.target.classList.contains("but_eliminar_nota_lista")) {
    const item = evt.target.closest("li.todas_las_notas");
    const id = item.dataset.idNota;
    const resp = await fetch(`/notas/${id}`, { method: "DELETE" });

    Swal.fire({
      title: "¿Estás seguro de que deseas eliminar esta nota?",
      text: "Si la eliminas no la podrás recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        if (resp.ok) {
          cargarNotas(buscadorNotas.value);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Nota eliminada",
            showConfirmButton: false,
            timer: 1500,
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

async function duplicarNota(evt) {
  if (evt.target.classList.contains("but_duplicar_nota_lista")) {
    const item = evt.target.closest("li.todas_las_notas");
    const id = item.dataset.idNota;
    console.log(item);
    const resp = await fetch(`/notas/${id}`, { method: "GET" });
    if (resp.ok) {
      const nota = await resp.json();
      console.log(nota);
      let nuevaNota = {
        titulo: nota.titulo + "(copia)",
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
          timer: 1500,
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

/*async function abrirNota(evt) {
  const item = evt.target.closest("li.todas_las_notas");
  const id = item.dataset.idNota;
  console.log(item);
  const resp = await fetch(`/notas`, { method: "GET" });
  if (resp.ok) {
    cargarNotaSeleccionada(id);
    let nota = document.getElementById("nota_seleccionada");
    let listado = document.getElementById("listado_notas");
    nota.style.display = "block";
    listado.style.display = "none";
  }
}*/

async function crearNota(evt) {
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
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Ups...",
      text: "Error al crear la nota.",
    });
  }
}
