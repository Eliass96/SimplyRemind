document.addEventListener("DOMContentLoaded", function () {
  var botonAddNota = document.getElementById("but_add_notas");
  var botonVolverAlListado = document.getElementById("but_volver_al_listado");
  var botonMostrarEventos = document.getElementById("but_mostrar_eventos");
  var botonMostrarNotas = document.getElementById("but_mostrar_notas");

  botonAddNota.addEventListener("click", addNota);
  botonVolverAlListado.addEventListener("click", function() {
    volverAlListado();
    mostrarBotonEventos();
  });
  botonMostrarEventos.addEventListener("click", function() {
    mostrarEventos();
    mostrarBotonNotas();
  });
  botonMostrarNotas.addEventListener("click", function() {
    mostrarNotas();
    mostrarBotonEventos();
  });
});

function addNota() {
  var nota = document.getElementById("nota_seleccionada");
  var listado = document.getElementById("listado_notas");
  var eventos = document.getElementById("eventos_dia_seleccionado");
  nota.style.display = "block";
  listado.style.display = "none";
  eventos.style.display = "none";
}

function volverAlListado() {
  var nota = document.getElementById("nota_seleccionada");
  var listado = document.getElementById("listado_notas");
  var eventos = document.getElementById("eventos_dia_seleccionado");
  nota.style.display = "none";
  listado.style.display = "block";
  eventos.style.display = "none";
}

function mostrarEventos() {
  var nota = document.getElementById("nota_seleccionada");
  var listado = document.getElementById("listado_notas");
  var eventos = document.getElementById("eventos_dia_seleccionado");
  nota.style.display = "none";
  listado.style.display = "none";
  eventos.style.display = "block";
}

function mostrarNotas() {
  var nota = document.getElementById("nota_seleccionada");
  var listado = document.getElementById("listado_notas");
  var eventos = document.getElementById("eventos_dia_seleccionado");
  nota.style.display = "none";
  listado.style.display = "block";
  eventos.style.display = "none";
}

function mostrarBotonEventos() {
  var mostrar_notas = document.getElementById("but_mostrar_notas");
  var mostrar_eventos = document.getElementById("but_mostrar_eventos");
  mostrar_notas.style.display = "none";
  mostrar_eventos.style.display = "block";
}

function mostrarBotonNotas() {
  var mostrar_notas = document.getElementById("but_mostrar_notas");
  var mostrar_eventos = document.getElementById("but_mostrar_eventos");
  mostrar_notas.style.display = "block";
  mostrar_eventos.style.display = "none"; // Aquí está la corrección
}
