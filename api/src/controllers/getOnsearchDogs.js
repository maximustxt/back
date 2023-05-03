require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize"); // importamos operators de sequelize....
const getDogsApi = require("./getDogsApi");
//BOXER
const getOnsearchDogs = async (namequery) => {
  // BOXER ==> Boxer
  // a partir de aca lo que hago es modificar y adaptar a el nombre que me llega por parametro y transformarlo para que lo pueda comparar con el nombre de cada perro...
  // ej: me llega ===> SALCHICHA lo que debo hacer es transformarlo ===> Salchicha para poder comparar en la base de datos como en la api si existe,porque todos los nombres esta de esa manera ==> M ==> primera letra mayuscula y el resto minuscula...
  const arrayDeDogs = namequery.split(" ");
  let namePerros = "";
  for (let i = 0; i < arrayDeDogs.length; i++) {
    let palabraModificada =
      arrayDeDogs[i][0].toUpperCase() + arrayDeDogs[i].slice(1).toLowerCase();
    namePerros += " " + palabraModificada;
  }
  namequery = namePerros.trim(); //saco espacios quqe encuentre...

  //*----------------------------------------------------------------------------------------------*//

  const result = await Dog.findAll({
    where: {
      name: {
        [Op.like]: `%${namequery}`,
      },
    },

    // aparte de filtrar pot nombre debo traer la tabla  de temperaments y unirla para cada perro... porque sino no se va a mostrar el temperamneto en la pagina..
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [], //lo que decimos es que de la tabla intermedia no quiero nungun atributo de la misma , el array vacio ===> hace referencia a nada..
      },
    },
  });

  if (result.length !== 0) {
    return result;
  } else {
    const responseApi = await getDogsApi();
    const perroEncontrado = responseApi.filter(
      (dog) => dog.name === namequery || dog.name.includes(namequery) // o sino directamente que devuelva en minuscula...
    ); // transformo directamente la palabra de la api en minusculas como tambien en lo que recibo por query..
    if (perroEncontrado.length !== 0) {
      return perroEncontrado; // retorno el array que contenga los que estan asociados al nombre o lo incluyan..
    } else {
      throw Error("🛑 No se encontró la raza de perro!!!");
    }
  }
};

module.exports = getOnsearchDogs;
