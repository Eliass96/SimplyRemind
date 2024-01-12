document.addEventListener("DOMContentLoaded", function () {
  var botonAddNota = document.getElementById("but_add_notas");
  var botonVolverAlListado = document.getElementById("but_volver_al_listado");
  var botonMostrarEventos = document.getElementById("but_mostrar_eventos");
  var botonMostrarNotas = document.getElementById("but_mostrar_notas");

  var botonIniciarSesion = document.getElementById("but_login");
  var botonMostrarLogin = document.getElementById("but_loguearse");
  var botonOcultarLogin = document.getElementById("but_cerrar_login");
  var botonMostrarRegistro = document.getElementById("but_registrarse");
  var botonOcultarRegistro = document.getElementById("but_cerrar_registro");
  var botonMasOpcionesNota = document.getElementById("but_mas_opciones_nota");

  botonAddNota.addEventListener("click", addNota);
  botonVolverAlListado.addEventListener("click", function () {
    volverAlListado();
    mostrarBotonEventos();
  });
  botonMostrarEventos.addEventListener("click", function () {
    mostrarEventos();
    mostrarBotonNotas();
  });
  botonMostrarNotas.addEventListener("click", function () {
    mostrarNotas();
    mostrarBotonEventos();
  });

  botonIniciarSesion.addEventListener("click", mostrarLogin);
  botonMostrarLogin.addEventListener("click", mostrarLogin);
  botonOcultarLogin.addEventListener("click", ocultarLogin);
  botonMostrarRegistro.addEventListener("click", mostrarRegistro);
  botonOcultarRegistro.addEventListener("click", ocultarRegistro);
  botonMasOpcionesNota.addEventListener("click", masOpcionesNota);

  document.addEventListener('click', function() {
    var desplegable = document.getElementById('dropdown-content');
    desplegable.style.display = 'none';
  });
});

function addNota() {
  let nota = document.getElementById("nota_seleccionada");
  let listado = document.getElementById("listado_notas");
  let eventos = document.getElementById("eventos_dia_seleccionado");
  nota.style.display = "block";
  listado.style.display = "none";
  eventos.style.display = "none";
}

function volverAlListado() {
  let nota = document.getElementById("nota_seleccionada");
  let listado = document.getElementById("listado_notas");
  let eventos = document.getElementById("eventos_dia_seleccionado");
  nota.style.display = "none";
  listado.style.display = "block";
  eventos.style.display = "none";
}

function mostrarEventos() {
  let nota = document.getElementById("nota_seleccionada");
  let listado = document.getElementById("listado_notas");
  let eventos = document.getElementById("eventos_dia_seleccionado");
  nota.style.display = "none";
  listado.style.display = "none";
  eventos.style.display = "block";
}

function mostrarNotas() {
  let nota = document.getElementById("nota_seleccionada");
  let listado = document.getElementById("listado_notas");
  let eventos = document.getElementById("eventos_dia_seleccionado");
  nota.style.display = "none";
  listado.style.display = "block";
  eventos.style.display = "none";
}

function mostrarBotonEventos() {
  let mostrar_notas = document.getElementById("but_mostrar_notas");
  let mostrar_eventos = document.getElementById("but_mostrar_eventos");
  mostrar_notas.style.display = "none";
  mostrar_eventos.style.display = "block";
}

function mostrarBotonNotas() {
  let mostrar_notas = document.getElementById("but_mostrar_notas");
  let mostrar_eventos = document.getElementById("but_mostrar_eventos");
  mostrar_notas.style.display = "block";
  mostrar_eventos.style.display = "none";
}

function mostrarLogin() {
  let formLogin = document.getElementById("datos_login");
  let formRegistro = document.getElementById("datos_registro");
  let overlay = document.getElementById("overlay");
  let login = document.getElementById("form_login");
  let registro = document.getElementById("form_registro");
  if (login) {
    login.style.display = "block";
  }

  if (registro) {
    registro.style.display = "none";
  }
  overlay.style.display = "block";
  formLogin.reset();
  formRegistro.reset();
}

function ocultarLogin() {
  let formLogin = document.getElementById("datos_login");
  let formRegistro = document.getElementById("datos_registro");
  let overlay = document.getElementById("overlay");
  let login = document.getElementById("form_login");
  let registro = document.getElementById("form_registro");
  if (login) {
    login.style.display = "none";
  }

  if (registro) {
    registro.style.display = "none";
  }

  overlay.style.display = "none";
  formLogin.reset();
  formRegistro.reset();
}

function mostrarRegistro() {
  let formLogin = document.getElementById("datos_login");
  let formRegistro = document.getElementById("datos_registro");
  let overlay = document.getElementById("overlay");
  let login = document.getElementById("form_login");
  let registro = document.getElementById("form_registro");

  if (login) {
    login.style.display = "none";
  }

  if (registro) {
    registro.style.display = "block";
  }
  overlay.style.display = "block";
  formLogin.reset();
  formRegistro.reset();
}

function ocultarRegistro() {
  let formLogin = document.getElementById("datos_login");
  let formRegistro = document.getElementById("datos_registro");
  let overlay = document.getElementById("overlay");
  let login = document.getElementById("form_login");
  let registro = document.getElementById("form_registro");
  if (login) {
    login.style.display = "none";
  }

  if (registro) {
    registro.style.display = "none";
  }
  overlay.style.display = "none";
  formLogin.reset();
  formRegistro.reset();
}

function masOpcionesNota(event) {
  event.stopPropagation(); // Detiene la propagación del evento
  let desplegable = document.getElementById("dropdown-content");

  if (desplegable.style.display == 'none' || desplegable.style.display == '') {
    desplegable.style.display = 'block';
  } else {
    desplegable.style.display = 'none';
  }
}
