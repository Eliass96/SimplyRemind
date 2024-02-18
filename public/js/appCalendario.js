let fecha;
//let datosEventos;

document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  let frm = document.getElementById("formulario");
  let eliminar = document.getElementById("btnEliminar");
  let myModal = new bootstrap.Modal(document.getElementById("myModal"));

  outputEventos = document.getElementById("outputEventos");
  outputEventoExpandido = document.getElementById("outputEventoExpandido");
  outputEventos.addEventListener("click", expandirEvento);
  outputEventos.addEventListener("click", cerrarEvento);

  var calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: "bootstrap5",
    initialView: "dayGridMonth",
    locale: "es",
    selectable: true,
    customButtons: {
      miLogo: {
        icon: "../img/calendario.png",
        click: function () {
          calendar.today();
        },
      },
      addEvento: {
        icon: "/public/icon/bars.svg",
        click: function (info) {
          frm.reset();
          eliminar.classList.add("d-none");
          document.getElementById("start").value = fecha;
          document.getElementById("btnAccion").textContent = "Registrar";
          document.getElementById("titulo").textContent = "Registrar Evento";
          myModal.show();
        },
      },
      botonPrev: {
        icon: "../icon/circle-arrow-left.svg",
        click: function () {
          calendar.prev();
        },
      },
      botonNext: {
        icon: "../icon/circle-arrow-right.svg",
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
    eventClick: function (info) {
      document.getElementById("id").value = info.event.id;
      document.getElementById("title").value = info.event.title;
      document.getElementById("start").value = info.event.startStr;
      document.getElementById("color").value = info.event.backgroundColor;
      document.getElementById("btnAccion").textContent = "Modificar";
      document.getElementById("titulo").textContent = "Actualizar Evento";
      eliminar.classList.remove("d-none");
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
    },
    firstDay: 1,
  });
  calendar.render();

  frm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const start = document.getElementById("start").value;
    const description = document.getElementById("description").value;
    const color = document.getElementById("color").value;
    if (title == "" || start == "") {
      Swal.fire("Aviso", "El título y la fecha son obligatorios", "warning");
    } else {
      const data = {
        nombre: title,
        diaEvento: start,
        descripcion: description,
        color: color,
      };
      const resp = await fetch(`/eventos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (resp.ok) {
        myModal.hide();
        calendar.refetchEvents();
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
  });

  eliminar.addEventListener("click", function () {
    myModal.hide();
    Swal.fire({
      title: "Advertencia",
      text: "¿Está seguro de eliminar este evento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await fetch(`/eventos/${id}`, { method: "DELETE" });
        if (resp.ok) {
          myModal.hide();
          calendar.refetchEvents();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Evento eliminado",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Error al eliminar el evento.",
        });
      }
    });
  });
});

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
    resp = await fetch(`/eventos?diaEvento=${filtro}`);
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
  if (evt.target.classList.contains("but_expandir_evento")) {
    const item = evt.target.closest("article.evento");
    const id = item.dataset.idEvento;
    console.log(id);
    const resp = await fetch(`/eventos/${id}`, { method: "GET" });
    if (resp.ok) {
      //cargarEventoSeleccionado(id);
      evento.classList.add("expanded");
    }
  }
}

async function cerrarEvento(evt) {
  if (evt.target.classList.contains("but_cerrar_evento")) {
    const item = evt.target.closest("article.evento");
    const id = item.dataset.idEvento;
    console.log(id);
    const resp = await fetch(`/eventos/${id}`, { method: "GET" });
    if (resp.ok) {
      //cargarEventoSeleccionado(id);
      evento.classList.remove("expanded");
    }
  }
}

/*async function cargarEventoSeleccionado(idEvento) {
  let resp;
  url = `/eventos/${idEvento}`;
  console.log(url);
  try {
    resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("Error al cargar");
    }
    const datosEvento = await resp.json();
    console.log(datosEvento);
    const html = eventoExpandido(datosEvento);
    outputEventoExpandido.innerHTML = html;
  } catch (error) {
    alert(error);
  }
}*/
