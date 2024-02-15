document.addEventListener("DOMContentLoaded", function () {
  var botonAddNota = document.getElementById("but_add_notas");
  var botonVolverAlListado = document.getElementById("but_volver_al_listado");

  botonAddNota.addEventListener("click", addNota);
  botonVolverAlListado.addEventListener("click", volverAlListado);

  var maxChars = 25;

  document
    .getElementById("titulo_nota_seleccionada")
    .addEventListener("keypress", function (e) {
      if (e.target.textContent.length > maxChars && e.which !== 8) {
        e.preventDefault();
      }
    });

  const eventos = document.querySelectorAll(".evento");

  eventos.forEach((evento) => {
    const contenidoEvento = evento.querySelector(".contenido_evento");
    const botonExpandir = evento.querySelector("#but_expandir_evento"); // Cambia el selector al ID del botón de expandir
    const botonCerrar = evento.querySelector(".but_cerrar_evento");

    botonExpandir.addEventListener("click", () => {
      evento.classList.add("expanded"); // Agrega la clase expandido al hacer clic en el botón de expandir
    });

    botonCerrar.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que el evento de clic se propague al contenedor
      evento.classList.remove("expanded"); // Quita la clase expandido al hacer clic en el botón de cerrar
    });
  });

  // Abre el diálogo al hacer clic en el botón con id "but_etiquetar_nota"
  /*document
    .getElementById("but_nueva_etiqueta")
    .addEventListener("click", function () {
      const etiquetarNotaModal = document.getElementById("etiquetar_nota");
      etiquetarNotaModal.classList.add("show");
      etiquetarNotaModal.style.display = "block";
      document.body.classList.add("modal-open");
    });

  // Cierra el diálogo al hacer clic en el botón con id "aceptar_etiqueta"
  document.getElementById("aceptar_etiqueta").addEventListener("click", function () {
  const inputValue = document.getElementById("inputText").value;
  console.log("Texto ingresado:", inputValue);
  inputValue.textContent = "";

  const etiquetarNotaModal = document.getElementById("etiquetar_nota");
  etiquetarNotaModal.classList.remove("show");
  etiquetarNotaModal.style.display = "none";
  document.body.classList.remove("modal-open");
});*/
});

function addNota() {
  let nota = document.getElementById("nota_seleccionada");
  let listado = document.getElementById("listado_notas");
  nota.style.display = "block";
  listado.style.display = "none";
}

function volverAlListado() {
  let nota = document.getElementById("nota_seleccionada");
  let listado = document.getElementById("listado_notas");
  nota.style.display = "none";
  listado.style.display = "block";
}