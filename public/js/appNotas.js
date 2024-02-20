let outputNotas;
let buscadorNotas;
let botonBorrarNota;
let botonDuplicarNota;

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

  outputNotaSeleccionada.addEventListener("click", etiquetarNota);
  outputNotaSeleccionada.addEventListener("click", editarEtiqueta);
  outputNotaSeleccionada.addEventListener("click", eliminarEtiqueta);

  let ordenarPorFecha = false;
  let cambiosGuardados;

  document
    .getElementById("ordenar_por_fecha")
    .addEventListener("click", function () {
      ordenarPorFecha = true;
      cargarNotas(buscadorNotas.value, ordenarPorFecha);
    });
  document
    .getElementById("ordenar_por_nombre")
    .addEventListener("click", function () {
      ordenarPorFecha = false;
      cargarNotas(buscadorNotas.value, ordenarPorFecha);
    });

  cargarNotas(ordenarPorFecha);

  function buscar() {
    cargarNotas(buscadorNotas.value, ordenarPorFecha);
    let nota = document.getElementById("nota_seleccionada");
    let listado = document.getElementById("listado_notas");
    nota.style.display = "none";
    listado.style.display = "block";
  }

  async function cargarNotas(filtro, ordenarPorFecha) {
    let url_notas;
    if (filtro) {
      url_notas = `/notas?titulo=${filtro}`;
    } else {
      url_notas = "/notas";
    }
    try {
      let resp = await fetch(url_notas);
      if (!resp.ok) {
        throw new Error("Error al cargar");
      }
      const datosNotas = await resp.json();
      if (ordenarPorFecha === true) {
        datosNotas.sort((a, b) =>
          a.fecha < b.fecha ? 1 : b.fecha < a.fecha ? -1 : 0
        );
      } else {
        datosNotas.sort((a, b) =>
          a.titulo > b.titulo ? 1 : b.titulo > a.titulo ? -1 : 0
        );
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
    let url_notas = `/notas/${idNota}`;
    try {
      resp = await fetch(url_notas);
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

  async function cerrarNota(evt) {
    if (
      evt.target.classList.contains("but_volver_al_listado") ||
      evt.target.classList.contains("but_volver_al_listado_icon")
    ) {
      const item = evt.target.closest("#outputNotaSeleccionada");
      let id = item.dataset.idNota;
      let url_notas = `/notas/${id}`;

      resp = await fetch(url_notas);
      if (resp.ok) {
        const nota = await resp.json();
        if (
          nota.titulo != item.querySelector(".titulo_nota_seleccionada").textContent.trim() ||
          nota.texto != item.querySelector(".contenido_nota_seleccionada").textContent.trim() ||
          nota.color != item.querySelector("input[type='color']").value
        ) {
          cambiosGuardados = false;
        } else {
          cambiosGuardados = true;
          cargarNotas(buscadorNotas.value, ordenarPorFecha);
          let nota = document.getElementById("nota_seleccionada");
          let listado = document.getElementById("listado_notas");
          nota.style.display = "none";
          listado.style.display = "block";
        }
      }

      if (!cambiosGuardados) {
        Swal.fire({
          title: "Advertencia",
          text: "No se han guardado los cambios",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Salir igualmente",
        }).then(async (result) => {
          if (result.isConfirmed) {
            cargarNotas(buscadorNotas.value, ordenarPorFecha);
            let nota = document.getElementById("nota_seleccionada");
            let listado = document.getElementById("listado_notas");
            nota.style.display = "none";
            listado.style.display = "block";
          }
        });
      }
    }
  }

  async function eliminarNotaLista(evt) {
    if (
      evt.target.classList.contains("but_eliminar_nota_lista") ||
      evt.target.classList.contains("but_eliminar_nota_lista_icon")
    ) {
      const item = evt.target.closest("li.todas_las_notas");
      const id = item.dataset.idNota;

      Swal.fire({
        title: "Advertencia",
        text: "¿Estás seguro de que deseas eliminar esta nota?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await fetch(`/notas/${id}`, { method: "DELETE" });
          if (resp.ok) {
            cargarNotas(buscadorNotas.value, ordenarPorFecha);
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
    if (
      evt.target.classList.contains("but_eliminar_nota") ||
      evt.target.classList.contains("but_eliminar_nota_icon")
    ) {
      const item = evt.target.closest("#outputNotaSeleccionada");
      let id = item.dataset.idNota;
      let url_notas = `/notas/${id}`;

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
          const resp = await fetch(url_notas, { method: "DELETE" });
          if (resp.ok) {
            cargarNotas(buscadorNotas.value, ordenarPorFecha);
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
    if (
      evt.target.classList.contains("but_duplicar_nota_lista") ||
      evt.target.classList.contains("but_duplicar_nota_lista_icon")
    ) {
      const item = evt.target.closest("li.todas_las_notas");
      const id = item.dataset.idNota;
      const resp = await fetch(`/notas/${id}`, { method: "GET" });
      if (resp.ok) {
        const nota = await resp.json();
        let nuevaNota = {
          titulo: nota.titulo + " (copia)",
          texto: nota.texto,
          color: nota.color,
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
          cargarNotas(buscadorNotas.value, ordenarPorFecha);
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
    if (
      evt.target.classList.contains("but_duplicar_nota") ||
      evt.target.classList.contains("but_duplicar_nota_icon")
    ) {
      const item = evt.target.closest("#outputNotaSeleccionada");
      let id = item.dataset.idNota;
      let url_notas = `/notas/${id}`;

      const resp = await fetch(url_notas, { method: "GET" });
      if (resp.ok) {
        const nota = await resp.json();
        let nuevaNota = {
          titulo: nota.titulo + " (copia)",
          texto: nota.texto,
          color: nota.color,
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
      etiquetas: [],
    };
    const resp = await fetch("/notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaNota),
    });
    if (resp.ok) {
      cargarNotas(buscadorNotas.value, ordenarPorFecha);
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
    if (
      evt.target.classList.contains("but_editar_nota") ||
      evt.target.classList.contains("but_editar_nota_icon")
    ) {
      const item = evt.target.closest("#outputNotaSeleccionada");
      let id = item.dataset.idNota;
      let url_notas = `/notas/${id}`;

      const resp = await fetch(url_notas, { method: "GET" });

      if (resp.ok) {
        const nota = await resp.json();
        nota.titulo = item
          .querySelector(".titulo_nota_seleccionada")
          .textContent.trim();
        nota.texto = item
          .querySelector(".contenido_nota_seleccionada")
          .textContent.trim();
        nota.color = item.querySelector("input[type='color']").value;
        const etiquetasElementos = item.querySelectorAll(".etiqueta");
        const etiquetas = Array.from(etiquetasElementos).map((etiqueta) =>
          etiqueta.textContent.trim()
        );
        nota.etiquetas = etiquetas;
        nota._id = nota._id;

        const respEditar = await fetch(url_notas, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nota),
        });

        if (respEditar.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cambios guardados",
            showConfirmButton: false,
            timer: 1000,
          });
          cambiosGuardados = true;
        } else {
          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Error al guardar los cambios",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Error al guardar los cambios",
        });
      }
    }
  }

  async function etiquetarNota(evt) {
    if (
      evt.target.classList.contains("but_nueva_etiqueta") ||
      evt.target.classList.contains("but_nueva_etiqueta_icon")
    ) {
      const item = evt.target.closest("#outputNotaSeleccionada");
      let id = item.dataset.idNota;
      let url_notas = `/notas/${id}`;
      let nuevaEtiqueta = "";

      const resp = await fetch(url_notas, { method: "GET" });

      Swal.fire({
        title: "Etiqueta tu nota",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Etiquetar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async (valor) => {
          try {
            if (valor === "") {
              Swal.fire(
                "Aviso",
                "No se puede crear una etiqueta vacía",
                "warning"
              );
            } else {
              nuevaEtiqueta = valor;
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Ups...",
              text: "Error al crear la etiqueta",
            });
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (resp.ok) {
            const nota = await resp.json();
            if (nuevaEtiqueta !== "") {
              nota.titulo = item
                .querySelector(".titulo_nota_seleccionada")
                .textContent.trim();
              nota.texto = item
                .querySelector(".contenido_nota_seleccionada")
                .textContent.trim();
              nota.color = item.querySelector("input[type='color']").value;
              nota._id = nota._id;
              nota.etiquetas.push(nuevaEtiqueta);

              const respEditar = await fetch(url_notas, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(nota),
              });

              if (respEditar.ok) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Etiqueta creada",
                  showConfirmButton: false,
                  timer: 1000,
                });
                cambiosGuardados = true;
                cargarNotaSeleccionada(id);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Ups...",
                  text: "Error al crear la etiqueta",
                });
              }
            }
          }
        }
      });
    }
  }

  async function editarEtiqueta(evt) {
    if (
      evt.target.classList.contains("but_editar_etiqueta") ||
      evt.target.classList.contains("but_editar_etiqueta_icon")
    ) {
      const etiquetaAnterior = evt.target
        .closest("li.etiqueta")
        .textContent.trim();
      let etiquetaEditada = "";

      const item = evt.target.closest("#outputNotaSeleccionada");
      let id = item.dataset.idNota;
      let url_notas = `/notas/${id}`;

      const resp = await fetch(url_notas, { method: "GET" });

      Swal.fire({
        title: "Edita tu etiqueta",
        input: "text",
        inputValue: etiquetaAnterior,
        showCancelButton: true,
        confirmButtonText: "Modificar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async (valor) => {
          try {
            if (valor === "") {
              Swal.fire(
                "Aviso",
                "No se puede modificar una etiqueta vacía",
                "warning"
              );
            } else {
              etiquetaEditada = valor;
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Ups...",
              text: "Error al modificar la etiqueta",
            });
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (resp.ok) {
            const nota = await resp.json();
            if (etiquetaEditada !== "") {
              nota.titulo = item
                .querySelector(".titulo_nota_seleccionada")
                .textContent.trim();
              nota.texto = item
                .querySelector(".contenido_nota_seleccionada")
                .textContent.trim();
              nota.color = item.querySelector("input[type='color']").value;
              nota._id = nota._id;
              nota.etiquetas = nota.etiquetas.map((etiqueta) => {
                if (etiqueta === etiquetaAnterior) {
                  return etiquetaEditada; // Reemplaza la etiqueta anterior con la etiqueta editada
                }
                return etiqueta; // Devuelve la etiqueta sin cambios si no coincide con la anterior
              });

              const respEditar = await fetch(url_notas, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(nota),
              });

              if (respEditar.ok) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Etiqueta modificada",
                  showConfirmButton: false,
                  timer: 1000,
                });
                cambiosGuardados = true;
                cargarNotaSeleccionada(id);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Ups...",
                  text: "Error al modificar la etiqueta",
                });
              }
            }
          }
        }
      });
    }
  }

  async function eliminarEtiqueta(evt) {
    if (
      evt.target.classList.contains("but_eliminar_etiqueta") ||
      evt.target.classList.contains("but_eliminar_etiqueta_icon")
    ) {
      const etiquetaAEliminar = evt.target.closest("li.etiqueta");
      const item = evt.target.closest("#outputNotaSeleccionada");
      let id = item.dataset.idNota;
      let url_notas = `/notas/${id}`;

      Swal.fire({
        title: "Advertencia",
        text: "¿Estás seguro de que deseas eliminar esta etiqueta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await fetch(url_notas, { method: "GET" });
          if (resp.ok) {
            const nota = await resp.json();
            nota.titulo = item
              .querySelector(".titulo_nota_seleccionada")
              .textContent.trim();
            nota.texto = item
              .querySelector(".contenido_nota_seleccionada")
              .textContent.trim();
            nota.color = item.querySelector("input[type='color']").value;
            nota._id = nota._id;
            nota.etiquetas = nota.etiquetas.filter(
              (etiqueta) => etiqueta !== etiquetaAEliminar.textContent
            );
            const respEliminar = await fetch(url_notas, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(nota),
            });
            if (respEliminar.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Etiqueta eliminada",
                showConfirmButton: false,
                timer: 1000,
              });
              cambiosGuardados = true;
              cargarNotaSeleccionada(id);
            } else {
              Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Error al eliminar la etiqueta",
              });
            }
          }
        }
      });
    }
  }
});
