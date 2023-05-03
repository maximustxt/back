require("dotenv").config();
const axios = require("axios");
const { Temperament } = require("../db");
const { URL, KEY } = process.env;

const getTemperaments = async () => {
  // Aca obtenemos el array completo de razas de perros de la peticion...
  const dataAPi = await axios.get(`${URL}/breeds?key=${KEY}`);
  const TemperamentsDogs = dataAPi.data.map((dog) => dog.temperament); // recorro el array y me traigo los temperamentos con un map...en otro array ===> [TemperamentsDogs]...
  const arrayModificado = TemperamentsDogs.filter((temp) => temp !== undefined); // saco todos los temperamentos que son undefined...
  const orderTemps = arrayModificado.toString().split(","); // ==> ["sad,adas,adaw,wdad"] ==> tranformo en string y el array ya no es may array... y separo a cada uno , luego saco la coma con split ","... y me lo vuelve a transformar en array..
  orderTemps.forEach((temp) => {
    // recorremos el array de temperamentos...
    let cleanTemp = temp.trimStart().trimStart(); // saca los espacios , tanto de derecha como izquierda... creados por el split(",")...
    Temperament.findOrCreate({
      // luego aca le voy enviando uno por uno los temperamentos a la base de datos y me los va creando... se fija si no existe y me lo inserta , sino devuelve un booleano , pero en este caso no lo utilizo...
      where: { name: cleanTemp }, //filtro aca si ya existe o no el temperamento...
    });
  });
  const allTemps = await Temperament.findAll(); // me traigo todo lo que haya en la tabla de la base de datos..
  if (!allTemps.length) {
    throw Error("Hubo un error con lo temperamentos!!!");
  } else {
    return allTemps;
  }
};

module.exports = getTemperaments;
