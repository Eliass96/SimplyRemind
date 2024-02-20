let fecha;
let url_eventos;
let myModal;

document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  let frm = document.getElementById("formulario");
  myModal = new bootstrap.Modal(document.getElementById("myModal"));

  outputEventos = document.getElementById("outputEventos");
  outputEventos.addEventListener("click", expandirEvento);
  outputEventos.addEventListener("click", cerrarEvento);
  outputEventos.addEventListener("click", eliminarEvento);
  outputEventos.addEventListener("click", editarEvento);

  outputEventos.addEventListener("click", etiquetarEvento);
  outputEventos.addEventListener("click", editarEtiqueta);
  outputEventos.addEventListener("click", eliminarEtiqueta);

  let isEditing = false; // Variable para indicar si se está editando un evento

  var calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: "bootstrap5",
    initialView: "dayGridMonth",
    locale: "es",
    selectable: true,
    customButtons: {
      miLogo: {
        click: function () {
          calendar.today();
        },
      },
      addEvento: {
        click: function () {
          isEditing = false;
          frm.reset();
          document.getElementById("start").value = fecha;
          document.getElementById("start").readOnly = false;
          document.getElementById("btnAccion").textContent = "Registrar";
          document.getElementById("titulo").textContent = "Registrar Evento";
          myModal.show();
        },
      },
      botonPrev: {
        click: function () {
          calendar.prev();
        },
      },
      botonNext: {
        click: function () {
          calendar.next();
        },
      },
    },
    headerToolbar: {
      left: "miLogo botonPrev",
      center: "title",
      right: "botonNext addEvento",
    },
    editable: true,
    dateClick: function (info) {
      fecha = info.dateStr;
      cargarEventos(fecha);
    },
    firstDay: 1,
  });
  calendar.render();

  // Listener para el formulario de creación/edición de eventos
  frm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita recargar la página
    const nombre = document.getElementById("title").value;
    const diaEvento = document.getElementById("start").value;
    const descripcion = document.getElementById("description").value;
    const color = document.getElementById("color").value;

    let fechaActual = calendar.getDate().toISOString().slice(0, 10);

    if (diaEvento < fechaActual) {
      Swal.fire(
        "Aviso",
        "No se puede crear un evento en una fecha pasada",
        "warning"
      );
    } else if (nombre == "" || diaEvento == "" || descripcion == "") {
      Swal.fire("Aviso", "Todos los campos son obligatorios", "warning");
    } else {
      const evento = {
        nombre: nombre,
        diaEvento: diaEvento,
        descripcion: descripcion,
        color: color,
      };

      if (isEditing) {
        // Si se está editando un evento, realizar una solicitud PUT
        const id = document.getElementById("id").value; // Obtener el ID del evento
        evento._id = id;
        const resp = await fetch(`/eventos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evento),
        });

        if (resp.ok) {
          myModal.hide();
          calendar.refetchEvents();
          cargarEventos(fecha);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Evento modificado",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Error al modificar el evento.",
          });
        }
      } else {
        // Si no se está editando un evento, realizar una solicitud POST para crear un nuevo evento
        const resp = await fetch(`/eventos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evento),
        });

        if (resp.ok) {
          myModal.hide();
          calendar.refetchEvents();
          cargarEventos(fecha);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Evento registrado",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Error al crear el evento.",
          });
        }
      }
    }
  });

  async function editarEvento(evt) {
    if (
      evt.target.classList.contains("but_editar_evento") ||
      evt.target.classList.contains("but_editar_evento_icon")
    ) {
      evt.stopPropagation(); // Detiene la propagación del evento para evitar que se ejecute el formulario
      isEditing = true; // Establecer la variable isEditing a true para indicar que se está editando un evento

      const item = evt.target.closest("article.evento");
      const id = item.dataset.idEvento;

      let resp = await fetch(`/eventos/${id}`, { method: "GET" });
      if (resp.ok) {
        let evento = await resp.json();

        document.getElementById("id").value = evento._id;
        document.getElementById("title").value = evento.nombre;
        document.getElementById("description").value = evento.descripcion;
        document.getElementById("start").value = fecha;
        document.getElementById("start").readOnly = true;
        document.getElementById("color").value = evento.color;
        document.getElementById("btnAccion").textContent = "Modificar";
        document.getElementById("titulo").textContent = "Actualizar Evento";
        myModal.show();
      }
    }
  }

  async function cargarEventos(filtro) {
    let resp;
    try {
      url_eventos = `/eventos?diaEvento=${filtro}`;
      resp = await fetch(url_eventos);
      if (!resp.ok) {
        throw new Error("Error al cargar");
      }
      const datosEventos = await resp.json();
      const html = crearEventos({ eventos: datosEventos });
      outputEventos.innerHTML = html;
    } catch (error) {
      alert(error);
    }
  }

  async function expandirEvento(evt) {
    if (
      evt.target.classList.contains("but_expandir_evento") ||
      evt.target.classList.contains("but_expandir_evento_icon")
    ) {
      const item = evt.target.closest("article.evento");
      const id = item.dataset.idEvento;
      url_eventos = `/eventos/${id}`;
      const resp = await fetch(url_eventos, { method: "GET" });
      if (resp.ok) {
        item.classList.add("expanded");
      }
    }
  }

  async function cerrarEvento(evt) {
    if (
      evt.target.classList.contains("but_cerrar_evento") ||
      evt.target.classList.contains("but_cerrar_evento_icon")
    ) {
      const item = evt.target.closest("article.evento");
      const id = item.dataset.idEvento;
      url_eventos = `/eventos/${id}`;
      const resp = await fetch(url_eventos, { method: "GET" });
      if (resp.ok) {
        item.classList.remove("expanded");
      }
    }
  }

  async function eliminarEvento(evt) {
    if (
      evt.target.classList.contains("but_eliminar_evento") ||
      evt.target.classList.contains("but_eliminar_evento_icon")
    ) {
      const item = evt.target.closest("article.evento");
      const id = item.dataset.idEvento;

      Swal.fire({
        title: "Advertencia",
        text: "¿Estás seguro de que deseas eliminar este evento?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await fetch(`/eventos/${id}`, { method: "DELETE" });
          if (resp.ok) {
            cargarEventos(fecha);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Evento eliminado",
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Ups...",
              text: "Error al eliminar el evento.",
            });
          }
        }
      });
    }
  }

  async function etiquetarEvento(evt) {
    if (
      evt.target.classList.contains("but_nueva_etiqueta") ||
      evt.target.classList.contains("but_nueva_etiqueta_icon")
    ) {
      const item = evt.target.closest("article.evento");
      let id = item.dataset.idEvento;
      let url_eventos = `/eventos/${id}`;
      let nuevaEtiqueta = "";

      const resp = await fetch(url_eventos, { method: "GET" });

      Swal.fire({
        title: "Etiqueta tu evento",
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
            const evento = await resp.json();
            if (nuevaEtiqueta !== "") {
              evento.etiquetas.push(nuevaEtiqueta);

              const respEditar = await fetch(url_eventos, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(evento),
              });

              if (respEditar.ok) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Etiqueta creada",
                  showConfirmButton: false,
                  timer: 1000,
                });
                cargarEventos(fecha);
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

      const item = evt.target.closest("article.evento");
      let id = item.dataset.idEvento;
      let url_eventos = `/eventos/${id}`;

      const resp = await fetch(url_eventos, { method: "GET" });

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
            const evento = await resp.json();
            if (etiquetaEditada !== "") {
              evento.etiquetas = evento.etiquetas.map((etiqueta) => {
                if (etiqueta === etiquetaAnterior) {
                  return etiquetaEditada; // Reemplaza la etiqueta anterior con la etiqueta editada
                }
                return etiqueta; // Devuelve la etiqueta sin cambios si no coincide con la anterior
              });

              const respEditar = await fetch(url_eventos, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(evento),
              });

              if (respEditar.ok) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Etiqueta modificada",
                  showConfirmButton: false,
                  timer: 1000,
                });
                cargarEventos(fecha);
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
      const item = evt.target.closest("article.evento");
      let id = item.dataset.idEvento;
      let url_eventos = `/eventos/${id}`;

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
          const resp = await fetch(url_eventos, { method: "GET" });
          if (resp.ok) {
            const evento = await resp.json();
            evento.etiquetas = evento.etiquetas.filter(
              (etiqueta) => etiqueta !== etiquetaAEliminar.textContent
            );
            const respEliminar = await fetch(url_eventos, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(evento),
            });
            if (respEliminar.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Etiqueta eliminada",
                showConfirmButton: false,
                timer: 1000,
              });
              cargarEventos(fecha);
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
