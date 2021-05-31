const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');




mongoose.connect(config.database, { useNewUrlParser: true});

mongoose.connection.on('connected', () => {
  console.log('Connecté à la base de données '+config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Erreur de connection'+err);
});

const app = express();

const users = require('./routes/user.route');
const friends = require('./routes/friend.route');

const port = process.env.PORT || 8080;


app.use(cors());

//Dossier statique
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/friends', friends);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server running on port '+port);
});