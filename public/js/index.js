document.addEventListener("DOMContentLoaded", function () {
  //var botonMostrarCalendario = document.getElementById("but_mostrar_calendario");

  var botonAddNota = document.getElementById("but_add_notas");
  var botonVolverAlListado = document.getElementById("but_volver_al_listado");

  var botonIniciarSesion = document.getElementById("but_login");
  var botonMostrarLogin = document.getElementById("but_loguearse");
  var botonOcultarLogin = document.getElementById("but_cerrar_login");
  var botonMostrarRegistro = document.getElementById("but_registrarse");
  var botonOcultarRegistro = document.getElementById("but_cerrar_registro");

  botonAddNota.addEventListener("click", addNota);
  botonVolverAlListado.addEventListener("click", volverAlListado);

  botonIniciarSesion.addEventListener("click", mostrarLogin);
  botonMostrarLogin.addEventListener("click", mostrarLogin);
  botonOcultarLogin.addEventListener("click", ocultarLogin);
  botonMostrarRegistro.addEventListener("click", mostrarRegistro);
  botonOcultarRegistro.addEventListener("click", ocultarRegistro);

  var maxChars = 25;

  document
    .getElementById("titulo_nota_seleccionada")
    .addEventListener("keypress", function (e) {
      if (e.target.textContent.length > maxChars && e.which !== 8) {
        e.preventDefault();
      }
    });
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
