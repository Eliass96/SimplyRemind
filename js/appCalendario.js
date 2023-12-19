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
    /*headerToolbar: {
        left: 'prev, next, today',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, listWeek'
      }*/
  });
  calendar.render();
});
