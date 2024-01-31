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

const notas = [];

app.get("/notas", async function (req, resp) {
    try {
        const textoBusqueda = req.query.texto;
        if (textoBusqueda) {
            resp.send(await db.buscarNotaPorTitulo(textoBusqueda))
        } else {
            resp.send(await db.listarNotas());
        }
    } catch (err) {
        resp.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
    }
});

app.post("/notas", async function (req, resp) {
    try {
        const nuevaNota = await db.nuevaNota(req.body);

        resp.location(`/notas/${nuevaNota._id}`)
            .status(HTTP_CREATED)
            .send("Nota creada.");
    } catch (err) {
        resp.status(HTTP_INTERNAL_SERVER_ERROR).send(err);
    }
});

app.put("/notas/:id", function (req, resp) {
    // actualizar nota que tenga el id req.params.id
    // según los datos que vengan en req.body
    resp.sendStatus(HTTP_NO_CONTENT);
});

app.delete("/notas/:id", async function (req, resp) {
    await db.borrarNota(req.params.id);
});


db.conectar().then(() => {
    console.log("Conectado con la base de datos.");
    app.listen(5000, () =>
        console.log(`Servicio escuchando en el puerto ${PORT}`)
    );
});