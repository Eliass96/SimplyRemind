require("dotenv").config();
const mongoose = require("mongoose");

exports.conectar = async function () {
  await mongoose.connect(process.env.MONGODB_URL);
};

// Creación de los esquemas
const notaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    default: "Nueva Nota"
  },
  color: { type: String, required: true, default: "#000000" },
  texto: {
    type: String,
    required: true,
    default: "Texto de prueba para las notas...",
  },
  fecha_creacion: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString(),
  },
  etiquetas: [String],
});

const eventoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, default: "Nuevo evento" },
    descripcion: { type: String, required: true, default: "" },
    diaEvento: {
      type: String,
      required: true,
    },
    color: { type: String, required: true },
    etiquetas: [String],
  },
  {
    // Campos virtuales
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    virtuals: {
      diasHastaEvento: {
        get() {
          let tiempo = this.diaEvento - new Date();
          return Math.floor(tiempo / (1000 * 60 * 60 * 24));
        },
      },
    },
  }
);

// Creación de los modelos.
const Nota = mongoose.model("Nota", notaSchema);
const Evento = mongoose.model("Evento", eventoSchema);
exports.Nota = Nota;
exports.Evento = Evento;

// Notas
exports.nuevaNota = async function (datosNota) {
  try {
    if (!datosNota.titulo) {
      datosNota.titulo = "Nueva nota";
    }

    if (!datosNota.texto) {
      datosNota.texto = "Introduce el texto de tu nota...";
    }

    return await Nota.create(datosNota);
  } catch (error) {
    console.error("Error al crear una nueva nota: ", error);
    throw error;
  }
};

exports.duplicarNota = async function (datosNota) {
  try {
    let nuevaNota = {
      titulo: datosNota.titulo + "(copia)",
      texto: datosNota.texto,
      etiquetas: datosNota.etiquetas,
    };
    return await Nota.create(nuevaNota);
  } catch (error) {
    console.error("Error al crear una nueva nota: ", error);
    throw error;
  }
};

exports.editarNota = async function (datosNota) {
  try {
    let filtro = { _id: datosNota._id };
    let notaActualizada = await Nota.findOneAndUpdate(filtro, datosNota, {
      new: true,
    });
    return notaActualizada;
  } catch (error) {
    console.error("Error al editar la nota: ", error);
    throw error;
  }
};

exports.listarNotas = async function () {
  try {
    return Nota.find();
  } catch (error) {
    console.error("Error al listar las notas: ", error);
    throw error;
  }
};

exports.buscarNotaPorTitulo = async function (titulo) {
  try {
    return Nota.find({ titulo: new RegExp(titulo, "i") });
  } catch (error) {
    console.error("Error al listar las notas: ", error);
    throw error;
  }
};

exports.borrarNota = async function (idNota) {
  try {
    return Nota.deleteOne({ _id: idNota });
  } catch (error) {
    console.error("Error al eliminar la nota: ", error);
    throw error;
  }
};

// Eventos
exports.nuevoEvento = async function (datosEvento) {
  try {
    return await Evento.create(datosEvento);
  } catch (error) {
    console.error("Error al crear un nuevo evento: ", error);
    throw error;
  }
};

exports.editarEvento = async function (datosEvento) {
  try {
    let filtro = { _id: datosEvento._id };
    let eventoActualizado = await Evento.findOneAndUpdate(filtro, datosEvento, {
      new: true,
    });
    return eventoActualizado;
  } catch (error) {
    console.error("Error al editar el evento: ", error);
    throw error;
  }
};

exports.listarEventos = async function (diaSeleccionado) {
  try {
    return Evento.find({ diaEvento: { $eq: diaSeleccionado } });
  } catch (error) {
    console.error("Error al listar los eventos: ", error);
    throw error;
  }
};

exports.borrarEvento = async function (idEvento) {
  try {
    return Evento.deleteOne({ _id: idEvento });
  } catch (error) {
    console.error("Error al eliminar el evento: ", error);
    throw error;
  }
};

// Desconectar
exports.desconectar = mongoose.disconnect;
