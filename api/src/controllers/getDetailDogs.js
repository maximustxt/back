require("dotenv").config();
const { Dog, Temperament } = require("../db");
const getDogsApi = require("./getDogsApi");

const getDetailDogs = async (idRaza) => {
  // detail para la api...
  //const TemperamentDetail = await Temperament.findByPk(idRaza); // busca en la base de datos la tabla temperament el id que queremos , si lo encuntra lo trae como un objeto...
  // busca en la base de datos la tabla dogs el id que queremos , si lo encuntra lo trae como un objeto...

  if (isNaN(idRaza)) {
    // osea si no es un numero quiere decir que es un UUID...(tabla database)
    const DogDetail = await Dog.findByPk(idRaza, {
      include: {
        model: Temperament,
        attributes: ["name"], // de la tabla Temperaments quiero solo la columna name..
        through: {
          attributes: [], //lo que decimos es que de la tabla intermedia no quiero nungun atributo de la misma , el array vacio ===> hace referencia a nada..
        }, // de la tabla intermedia no quiero nada...
      },
    });
    if (!DogDetail) throw Error("Perro no encontrado en la base de datos!!!");
    else {
      return DogDetail;
    }
  } else {
    // de lo contrario es un numero (api)...
    const arrayPerro = await getDogsApi(); // lo que hago es traerme todos los perros que obtengo cuando hago un get....
    // luego de tenerlos filtro todo aquel perro que tenga id igual al que recibo por parametro...
    const perroEncontrado = arrayPerro.find((perro) => perro.id == idRaza); // la url toma como string al idRaza... por eso == validacion..
    if (!perroEncontrado) {
      // si no existe  o no hay nada tiro un error...
      throw Error("Perro no encontrado en la api!!!");
    } else {
      return perroEncontrado;
    }
  }
};

module.exports = getDetailDogs;
