const express = require("express");

const app = express();
app.use(express.json());

const notas = [];

app.get("/notas", function (req, resp) {
    const textoBusqueda = req.query.texto;
    if (textoBusqueda) {
        // GET /notas?texto=cosa
        // Notas filtradas
    } else {
        resp.send(notas);
    }
});

app.post("/notas", function (req, resp) {
    console.log(req.body);
    // Se crea...
    resp.location("/notas/hola").status(201).send("Nota creada.");
});

app.listen(5000, () => console.log("Servicio escuchando..."));