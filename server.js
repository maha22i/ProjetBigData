const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
// Serve static files

const corsOptions = {
  origin: "http://127.0.0.1:5500", // ou 'http://localhost:5500' selon votre configuration
};

app.use(cors(corsOptions));

// Spécifier le type MIME pour les fichiers CSS
express.static.mime.define({ "text/css": ["css"] });

mongoose
  .connect("mongodb://127.0.0.1:27017/Projet-bigData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

const etablissementSchema = new mongoose.Schema({
  numero_uai: {
    type: String,
    required: true,
  },
  appellation_officielle: {
    type: String,
    required: true,
  },
  denomination_principale: {
    type: String,
    required: true,
  },
  patronyme_uai: {
    type: String,
    required: true,
  },
  secteur_public_prive_libe: {
    type: String,
    required: true,
  },
  date_ouverture: {
    type: Date,
    required: true,
  },
  date_fermeture: {
    type: Date,
  },
  adresse_uai: {
    type: String,
    required: true,
  },
  lieu_dit_uai: {
    type: String,
  },
  boite_postale_uai: {
    type: String,
  },
  code_postal_uai: {
    type: String,
    required: true,
  },
  localite_acheminement_uai: {
    type: String,
    required: true,
  },
  coordonnee_x: {
    type: Number,
    required: true,
  },
  coordonnee_y: {
    type: Number,
    required: true,
  },
  epsg: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  position: {
    lon: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
  appariement: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
  nature_uai: {
    type: Number,
    required: true,
  },
  nature_uai_libe: {
    type: String,
    required: true,
  },
  code_departement: {
    type: String,
    required: true,
  },
  code_region: {
    type: Number,
    required: true,
  },
});

const Etablissement = mongoose.model("name", etablissementSchema);

app.get("/etablissements", (req, res) => {
  Etablissement.find({})
    .then(function (name) {
      res.json(name);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/etablissements/:ville", async (req, res) => {
  const ville = req.params.ville;
  try {
    const etablissements = await Etablissement.find({
      localite_acheminement_uai: ville,
    });
    res.send(etablissements);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3001, () => {
  console.log("server is Running");
});
