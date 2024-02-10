document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
      themeSystem: "bootstrap5",
      initialView: "dayGridMonth",
      locale: "es",
      customButtons: {
          miLogo: {
              text: "Mi Logo", // Agrega el atributo 'text'
              icon: "../img/calendario.png",
              click: function () {
                  // Lógica al hacer clic en el botón miLogo
              },
          },
          but_calendario: {
              text: "", // Agrega el atributo 'text'
              icon: "/public/icon/bars.svg",
              click: function () {
                  // Lógica al hacer clic en el botón but_calendario
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
          right: "botonNext but_calendario",
      },
      firstDay: 1,
  });
  calendar.render();
});

