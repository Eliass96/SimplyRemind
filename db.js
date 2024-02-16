require("dotenv").config();
const mongoose = require("mongoose");

exports.conectar = async function () {
  await mongoose.connect(process.env.MONGODB_URL);
};

// Creación de los esquemas
const notaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, default: "Nueva Nota" },
    texto: { type: String, required: true, default: "" },
    fecha_creacion: {
      type: String,
      required: true,
      default: new Date().toLocaleDateString(),
    },
    //color: { type: String, required: true, default: "#ff0000" },
    etiquetas: [String],
  },
  {
    // Métodos de instancia
    methods: {
      etiquetar(etiqueta) {
        this.etiquetas.push(etiqueta);
      },
    },
  }
);

// Middleware pre-save para actualizar la fecha de última modificación de la nota
notaSchema.pre("save", function (next) {
  this.fechaUltimaModificacion = new Date();
  next();
});

const eventoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, default: "Nuevo evento" },
    contenidoEvento: String,
    diaEvento: {
      type: String,
      required: true,
      /*validate: {
        validator: function (value) {
          let f = new Date();
          const formatDate = (d) => {
            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
          }
          return value > formatDate(f); //Función personalizada de validación.
        },
        message: "La fecha del evento tiene que ser posterior a la fecha actual.",
      },*/
    },
    //recordatorio: Date,
    todoElDia: { type: Boolean, required: true, default: false },
    color: String,
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
    let nuevaNota = { titulo: datosNota.titulo + "(copia)", texto: datosNota.texto, etiquetas: datosNota.etiquetas };
    return await Nota.create(nuevaNota);
  } catch (error) {
    console.error("Error al crear una nueva nota: ", error);
    throw error;
  }
};

exports.editarNota = async function (datosNota) {
  let filtro = { _id: datosNota._id };
  return await Nota.findOneAndUpdate(filtro, datosNota, { new: true });
};

exports.listarNotas = async function () {
  return Nota.find();
};

exports.buscarNotaPorTitulo = async function (titulo) {
  return Nota.find({ titulo: new RegExp(titulo, "i") });
};

exports.borrarNota = async function (idNota) {
  return Nota.deleteOne({ _id: idNota });
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
  let filtro = { _id: datosEvento.id };
  let eventoActualizado = await Evento.findOneAndUpdate(filtro, datosEvento, {
    new: true,
  });
  return eventoActualizado;
};

exports.listarEventos = async function (diaSeleccionado) {
  return Evento.find({ diaEvento: { $eq: diaSeleccionado } });
};

exports.borrarEvento = async function (idEvento) {
  return Evento.deleteOne({ _id: idEvento });
};

// Desconectar
exports.desconectar = mongoose.disconnect;
