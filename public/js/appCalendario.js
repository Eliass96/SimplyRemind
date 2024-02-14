let calendarEl = document.getElementById('calendar');
let frm = document.getElementById('formulario');
let eliminar = document.getElementById('btnEliminar');
let myModal = new bootstrap.Modal(document.getElementById('myModal'));

document.addEventListener("DOMContentLoaded", function () {
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
          document.getElementById("start").value = info.dateStr;
          document.getElementById("id").value = "";
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
    editable: true,
    dateClick: function (info) {
      cargarEventos(info.dateStr);
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
  frm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const start = document.getElementById("start").value;
    if (title == "" || start == "") {
      Swal.fire("Aviso", "Todo los campos son obligatorios", "warning");
    } else {
      const url = base_url + "Home/registrar";
      const http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.send(new FormData(frm));
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
    }
  });
  eliminar.addEventListener("click", function () {
    myModal.hide();
    Swal.fire({
      title: "Advertencia?",
      text: "Esta seguro de eliminar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const url =
          base_url + "Home/eliminar/" + document.getElementById("id").value;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            const res = JSON.parse(this.responseText);
            Swal.fire("Avisos?", res.msg, res.tipo);
            if (res.estado) {
              calendar.refetchEvents();
            }
          }
        };
      }
    });
  });
});

async function cargarEventos(filtro) {
  let resp;
  console.log(filtro);
  try {
    resp = await fetch(`/eventos?diaEvento=${filtro}`);
    if (!resp.ok) {
      throw new Error("Error al cargar");
    }
    const datosEventos = await resp.json();
    console.log(datosEventos);
    const html = crearEventos({ eventos: datosEventos });
    output.innerHTML = html;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}
