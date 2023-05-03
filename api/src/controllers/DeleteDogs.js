// const { Dog } = require("../db");

// const DeleteDogs = async (id) => {
//   const DogEliminar = Dog.findOne({ where: { id } });
//   if (!DogEliminar) {
//     throw Error("No existe ese perro.");
//   } else {
//     await Dog.destroy({ where: { id } });
//     return "Dog eliminada con exito";
//   }
// };

// module.exports = DeleteDogs;
