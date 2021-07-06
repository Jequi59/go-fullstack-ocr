const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Thing = require('./models/thing');

const app = express();

mongoose.connect('mongodb+srv://jquievreuxdev:Erin25012017@cluster0.aejzm.mongodb.net/testfs',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing ({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({message : "Objet enregistré !"}))
      .catch(() => res.status(400).json({error}))
});

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

module.exports = app;