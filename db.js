require("dotenv").config();
const mongoose = require("mongoose");

exports.conectar = async function () {
  await mongoose.connect(process.env.MONGODB_URL);
};

// Creación de los esquemas
const notaSchema = new mongoose.Schema(
  {
    // Nota: título, autor, texto, fechaCreacion, fechaUltimaModificacion, etiquetas
    titulo: String,
    texto: String,
    fecha_creacion: { type: Date, required: true, default: new Date() },
    fecha_ultima_modificacion: {
      type: Date,
      required: true,
      default: new Date(),
    },
    etiquetas: [String],
  },
  {
    // Campos virtuales
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    virtuals: {
      diasDesdeUltimaModificacion: {
        get() {
          let tiempo = new Date() - this.fechaUltimaModificacion;
          return Math.floor(tiempo / (1000 * 60 * 60 * 24));
        },
      },
    },
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
  this.fechaUltimaModificacion = Date.now();
  next();
});

const eventoSchema = new mongoose.Schema(
  {
    // Evento: título, autor, texto, fechaCreacion, fechaFin, horaEvento, todoElDia, etiquetas
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha_inicio: { type: Date, required: true, default: new Date() },
    fecha_fin: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.fechaCreacion; //Función personalizada de validación.
        },
        message: "La fecha fin tiene que ser posterior a la fecha actual.",
      },
    },
    recordatorio: Date,
    todoElDia: { type: Boolean, required: true, default: false },
    etiquetas: [String],
  },
  {
    // Campos virtuales
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    virtuals: {
      diasHastaFin: {
        get() {
          let tiempo = this.fechaFin - new Date();
          return Math.floor(tiempo / (1000 * 60 * 60 * 24));
        },
      },
    },
    // Métodos de instancia
    methods: {
      etiquetar(etiqueta) {
        this.etiquetas.push(etiqueta);
      },
    },
  }
);

// Middleware pre-save para actualizar la fecha de última modificación del evento
eventoSchema.pre("save", function (next) {
  this.fechaUltimaModificacion = Date.now();
  next();
});

// Creación de los modelos.
const Nota = mongoose.model("Nota", notaSchema);
const Evento = mongoose.model("Evento", eventoSchema);

exports.Nota = Nota;
exports.Evento = Evento;

// Notas
exports.nuevaNota = async function (datosNota) {
  try {
    if (!datosNota.titulo) {
      datosNota.titulo = "";
    }

    if (!datosNota.texto) {
      datosNota.texto = "";
    }

    return await Nota.create(datosNota);
  } catch (error) {
    console.error("Error al crear una nueva nota:", error);
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
  let regex = RegExp(".*" + titulo + ".*", "i");
  return Nota.find({ titulo: regex });
};

exports.borrarNota = async function (idNota) {
  return Nota.deleteOne({ _id: idNota });
};

// Eventos
exports.nuevoEvento = async function (datosEvento) {
  return await Evento.create(datosEvento);
};

exports.editarEvento = async function (datosEvento) {
  let filtro = { _id: datosEvento.id };
  let eventoActualizado = await Evento.findOneAndUpdate(filtro, datosEvento, {
    new: true,
  });
  return eventoActualizado;
};

exports.listarEventos = async function () {
  return Evento.find();
};

exports.buscarEventoPorTitulo = async function (titulo) {
  let regex = RegExp(".*" + titulo + ".*", "i");
  return Evento.find({ titulo: regex });
};

exports.borrarEvento = async function (idEvento) {
  return Evento.deleteOne({ _id: idEvento });
};

// Desconectar
exports.desconectar = mongoose.disconnect;
