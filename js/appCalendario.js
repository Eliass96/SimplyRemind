var myModal = new bootstrap.Modal(document.getElementById('myModal'));

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: "bootstrap5",
    initialView: "dayGridMonth",
    locale: "es",
    customButtons: {
      miLogo: {
        icon: "../img/calendario.png",
        click: function () {
        },
      },
      botonMasOpciones: {
        icon: "../icon/bars.svg",
        click: function () {
          botonMasOpciones.click();
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
    dateClick: function(info) {
      //console.log(info);
      document.getElementById('start').value = info.dateStr;
      document.getElementById('titulo').textContent = 'Registro de Evento';
      myModal.show();
    }
  });
  calendar.render();
});
