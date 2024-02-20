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
    //events: "/eventos/" + datosEventos,
    editable: true,
    dateClick: function (info) {
      fecha = info.dateStr;
      cargarEventos(fecha);
    },
    /*eventClick: function (info) {
      document.getElementById("id").value = info.event.id;
      document.getElementById("title").value = info.event.title;
      document.getElementById("start").value = info.event.startStr;
      document.getElementById("color").value = info.event.backgroundColor;
      document.getElementById("btnAccion").textContent = "Modificar";
      document.getElementById("titulo").textContent = "Actualizar Evento";
      myModal.show();
    },
    eventDrop: function (info) {
      const start = info.event.startStr;
      const id = info.event.id;
      const url = base_url + "Home/drag";
      const http = new XMLHttpRequest();
      const formDta = new FormData();
      formDta.append("start", start);
      formDta.append("id", id);
      http.open("POST", url, true);
      http.send(formDta);
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          const res = JSON.parse(this.responseText);
          Swal.fire("Avisos?", res.msg, res.tipo);
          if (res.estado) {
            myModal.hide();
            calendar.refetchEvents();
          }
        }
      };
    },*/
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
        color: color
      };

      if (isEditing) {
        // Si se está editando un evento, realizar una solicitud PUT
        const id = document.getElementById("id").value; // Obtener el ID del evento
        evento._id = id
        const resp = await fetch(`/eventos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evento),
        });
        console.log(evento);
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
        console.log(evento);
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

  /*async function listarEventos() {
  let resp;
  try {
    resp = await fetch(`/eventos`);
    if (!resp.ok) {
      throw new Error("Error al cargar");
    }
    datosEventos = await resp.json();

    datosEventos.forEach(evento => {
      if (!evento.color) {
        evento.color = '#3788D8';
      }
    });
    console.log(datosEventos);
  } catch (error) {
    alert(error);
  }
}*/

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
      console.log(url_eventos);
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
      console.log(id);
      url_eventos = `/eventos/${id}`;
      console.log(url_eventos);
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
});
