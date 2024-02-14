require("dotenv").config();
const express = require("express");
const db = require("./db.js");

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const PORT = process.env.PORT || 40000;

const app = express();
app.use(express.json());
app.use(express.static("public"));

const Nota = db.Nota;
const Evento = db.Evento;

// NOTAS
// Listar notas
app.get("/notas", async function (req, resp) {
  try {
    const textoBusqueda = req.query.titulo;
    if (textoBusqueda) {
      resp.status(HTTP_OK).send(await db.buscarNotaPorTitulo(textoBusqueda));
    } else {
      resp.status(HTTP_OK).send(await db.listarNotas());
    }
  } catch (err) {
    resp.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
  }
});

/*app.get("/notas/:id", async function (req, resp) {
  try {
    const textoBusqueda = req.params.id;
    if (textoBusqueda) {
      resp.status(HTTP_OK).send(await db.buscarNotaPorTitulo(textoBusqueda));
    } else {
      resp.status(HTTP_OK).send(await db.listarNotas());
    }
  } catch (err) {
    resp.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
  }
});*/

// Crear nota
app.post("/notas", async function (req, resp) {
  try {
    const nuevaNota = await db.nuevaNota(req.body);

    resp
      .location(`/notas/${nuevaNota._id}`)
      .status(HTTP_CREATED)
      .send("Nota creada.");
  } catch (err) {
    resp.status(HTTP_INTERNAL_SERVER_ERROR).send("Error interno del servidor");
  }
});

// Editar nota
app.put("/notas/:id", async function (req, resp) {
  try {
    const nota = await Nota.findById(req.params.id);
    if (nota) {
      const notaActualizada = await db.editarNota(req.params.id, req.body);
      resp.status(HTTP_OK).send(notaActualizada);
    } else {
      resp
        .status(HTTP_NOT_FOUND)
        .send(`No existe la nota con el ID ${req.params.id}`);
    }
  } catch (err) {
    resp.status(HTTP_INTERNAL_SERVER_ERROR).send("Error interno del servidor");
  }
});

// Eliminar nota
app.delete("/notas/:id", async function (req, resp) {
  try {
    const nota = await Nota.findById(req.params.id);
    if (nota) {
      await db.borrarNota(req.params.id);
      resp.status(HTTP_NO_CONTENT).send("Nota eliminada.");
    } else {
      resp
        .status(HTTP_NOT_FOUND)
        .send(`No existe la nota con el ID ${req.params.id}`);
    }
  } catch (err) {
    resp.status(HTTP_INTERNAL_SERVER_ERROR).send("Error interno del servidor");
  }
});

// EVENTOS
// Listar eventos
app.get("/eventos", async function (req, resp) {
  try {
    const diaSeleccionado = req.query.diaEvento;
    resp.status(HTTP_OK).send(await db.listarEventos(diaSeleccionado));
  } catch (err) {
    resp.status(HTTP_INTERNAL_SERVER_ERROR).send("Error interno del servidor");
  }
});

// Crear evento
app.post("/eventos", async function (req, resp) {
  try {
    const nuevoEvento = await db.nuevoEvento(req.body);

    resp
      .location(`/eventos/${nuevoEvento._id}`)
      .status(HTTP_CREATED)
      .send("Evento creado.");
  } catch (err) {
    resp.status(HTTP_INTERNAL_SERVER_ERROR).send("Error interno del servidor");
  }
});

// Editar evento
app.put("/eventos/:id", async function (req, resp) {
  try {
    const evento = await Evento.findById(req.params.id);
    if (evento) {
      const eventoActualizado = await db.editarEvento(req.params.id, req.body);
      resp.status(HTTP_OK).send(eventoActualizado);

    } else {
      resp
        .status(HTTP_NOT_FOUND)
        .send(`No existe el evento con el ID ${req.params.id}`);
    }
  } catch (err) {
    resp.status(HTTP_INTERNAL_SERVER_ERROR).send("Error interno del servidor");
  }
});

// Eliminar evento
app.delete("/eventos/:id", async function (req, resp) {
  try {
    const evento = await Evento.findById(req.params.id);
    if (evento) {
      await db
        .borrarEvento(req.params.id)
        .then(resp.status(HTTP_NO_CONTENT).send("Evento eliminado."));
    } else {
      resp
        .status(HTTP_NOT_FOUND)
        .send(`No existe el evento con el ID ${req.params.id}`);
    }
  } catch (err) {
    resp.status(HTTP_INTERNAL_SERVER_ERROR).send("Error interno del servidor");
  }
});

db.conectar().then(() => {
  console.log("Conectado con la base de datos.");
  app.listen(PORT, () =>
    console.log(`Servicio escuchando en el puerto ${PORT}`)
  );
});
