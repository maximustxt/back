require("dotenv").config();
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { URL, KEY } = process.env;

// Debo mandar todo lo que hay en la api en la base de datos y desde ahi manejar la informacion...

const getDogsApi = async () => {
  // Aca obtenemos el array completo de razas de perros de la peticion...
  const response = await axios.get(`${URL}/breeds?key=${KEY}`);
  // recordar siempre usar.data en axios..
  response.data; // esto ====> es el array de perros...

  const api = await response.data.map((dog) => {
    // api ===> [{el valor de propiedades modificados de cada perro con lo que necesito para el model.. }]
    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.imperial,
      life_span: dog.life_span,
      origin: dog.origin,
      temperament: dog.temperament,
      created: false,
    };
  });

  const database = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [], //lo que decimos es que de la tabla intermedia no quiero nungun atributo de la misma , el array vacio ===> hace referencia a nada..
      },
    },
  });

  const ArrayApiDb = [...api, ...database];

  if (!ArrayApiDb.length) {
    throw Error("Hubo un error con la response!!!");
  } else {
    return ArrayApiDb;
  }
};
//dogDB.Temperaments.find(temp => temp.name)

module.exports = getDogsApi;
