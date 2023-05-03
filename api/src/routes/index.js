const { Router } = require("express");
const getTemperaments = require("../controllers/getTemperaments");

const router = Router();

router.get("/temperaments", async (req, res) => {
  try {
    // debo hacer peticion en la api y guardarlo en la base de datos..
    const response = await getTemperaments();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
