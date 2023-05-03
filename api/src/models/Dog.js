const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      image: {
        //Imagen  URL:
        type: DataTypes.STRING,
        isUrl: true,
        allowNull: false,
      },
      name: {
        //name
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        // alto
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        // peso
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        // ESPERANZA DE VIDA
        type: DataTypes.STRING,
        allowNull: false,
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};

/*
{
		"weight": { ===> peso que es un objeto y tiene dos propiedades...
			"imperial": "6 - 13",
			"metric": "3 - 6"
		},
		"height": { ===> altura es un objeto y tiene 2 porpiedades
			"imperial": "9 - 11.5",
			"metric": "23 - 29"
		},
		"id": 1,
		"name": "Affenpinscher",
		"bred_for": "Small rodent hunting, lapdog",
		"breed_group": "Toy",
		"life_span": "10 - 12 years",
		"temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
		"origin": "Germany, France",
		"reference_image_id": "BJa4kxc4X",
		"image": { // es un objeto que contiene la url que es lo mas importantes...
			"id": "BJa4kxc4X",
			"width": 1600,
			"height": 1199,
			"url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
		}
	},

*/
