require("dotenv").config();
const mongoose = require("mongoose");

exports.conectar = async function () {
  await mongoose.connect(process.env.MONGODB_URL);
};

// Creación de los esquemas
const notaSchema = new mongoose.Schema(
  {
    // Nota: id, título, autor, texto, fechaCreacion, fechaUltimaModificacion, etiquetas
    id: { type: Number, required: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    texto: { type: String, required: true },
    fechaCreacion: { type: Date, required: true, default: new Date() },
    fechaUltimaModificacion: {
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
    // Evento: id, título, autor, texto, fechaCreacion, fechaFin, horaEvento, todoElDia, etiquetas
    id: { type: Number, required: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    texto: { type: String, required: true },
    fechaCreacion: { type: Date, required: true, default: new Date() },
    fechaFin: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
            return value > this.fechaCreacion; //Función personalizada de validación.
        },
        message: "La fecha fin tiene que ser posterior a la fecha actual.",
      },
    },
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

// Método tanto para nota como para evento
asignarId = function () {
  let id = Math.floor(Math.random() * 999999);
  return id;
};

// Notas
exports.nuevaNota = async function (datosNota) {
  let nuevoId = asignarId();
  while ((await Nota.countDocuments({ id: nuevoId })) > 0) {
    nuevoId = asignarId();
  }
  datosNota.id = nuevoId;
  return await Nota.create(datosNota);
};

exports.editarNota = async function (datosNota) {
  let filtro = { id: datosNota.id };
  return await Nota.findOneAndUpdate(filtro, datosNota, { new: true });
};

exports.buscarNotaPorTitulo = async function (titulo) {
  let regex = RegExp(".*" + titulo + ".*", "i");
  return Nota.find({ titulo: regex });
};

// Eventos
exports.nuevoEvento = async function (datosEvento) {
  let nuevoId = asignarId();
  while ((await Evento.countDocuments({ id: nuevoId })) > 0) {
    nuevoId = asignarId();
  }
  datosEvento.id = nuevoId;
  return await Evento.create(datosEvento);
};

exports.editarEvento = async function (datosEvento) {
  let filtro = { id: datosEvento.id };
  return await Evento.findOneAndUpdate(filtro, datosEvento, { new: true });
};

exports.buscarEventoPorTitulo = async function (titulo) {
  let regex = RegExp(".*" + titulo + ".*", "i");
  return Evento.find({ titulo: regex });
};

// Desconectar
exports.desconectar = mongoose.disconnect;
