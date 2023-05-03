const express = require("express");
const { Router } = express;
const getDogsApi = require("../controllers/getDogsApi");
const getOnsearchDogs = require("../controllers/getOnsearchDogs");
const getDetailDogs = require("../controllers/getDetailDogs");
const postDogs = require("../controllers/postDogs");
const { Dog, Temperament } = require("../db");
// const DeleteDogs = require("../controllers/DeleteDogs");
const dogs = Router();

//*--------------Lo que se va a renderizar en home---------------*//
dogs.get("/", async (req, res) => {
  try {
    const result = await getDogsApi();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//*---------------------Onsearch------------------------------*//

dogs.get("/onsearch", async (req, res) => {
  // me falto poner el /name en la ruta de busqueda...
  try {
    const { name } = req.query;
    if (name) {
      const result = await getOnsearchDogs(name);
      res.status(200).json(result);
    } else {
      throw Error("No se encontre el perro deseado");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//*-----------------------Detail----------------------------*//
dogs.get("/:idRaza", async (req, res) => {
  try {
    const { idRaza } = req.params;
    const result = await getDetailDogs(idRaza);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//*----------------------Post-------------------------*//

dogs.post("/", async (req, res) => {
  try {
    const { image, name, height, weight, life_span, temperament } = req.body;
    if (!image || !name || !height || !weight || !life_span || !temperament) {
      throw Error("Faltan datos");
    } else {
      const response = await postDogs({
        image,
        name,
        height,
        weight,
        life_span,
        temperament,
      });
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//*----------------------Delete-------------------------*//

// dogs.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const response = await DeleteDogs(id);
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = dogs;
