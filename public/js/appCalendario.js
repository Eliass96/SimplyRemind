var myModal = new bootstrap.Modal(document.getElementById("myModal"));

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: "bootstrap5",
    initialView: "dayGridMonth",
    locale: "es",
    customButtons: {
      miLogo: {
        icon: "../img/calendario.png",
        click: function () { },
      },
      botonMasOpciones: {
        icon: "../icon/bars.svg",
        click: function () {
          event.stopPropagation(); // Detiene la propagación del evento
          let desplegable = document.getElementById("dropdown_content_calendario");
        
          if (desplegable.style.display == "none" || desplegable.style.display == "") {
            desplegable.style.display = "block";
          } else {
            desplegable.style.display = "none";
          }
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
      right: "botonNext botonMasOpciones",
    },
    firstDay: 1,
    dateClick: function (info) {
      document.getElementById("start").value = info.dateStr;
      document.getElementById("titulo").textContent = "Registro de Evento";
      myModal.show();
    },
  });
  calendar.render();
});
