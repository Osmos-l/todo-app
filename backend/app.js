const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const config = require('./config.json');

const taskRoutes = require( './routes/task' );
const userRoutes = require( './routes/user' );

const app = express();

mongoose.connect('mongodb+srv://'+ config.bdd.username +':'+ config.bdd.password +'@cluster0.8mq8k.mongodb.net/'+ config.bdd.name +'?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
 } )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use( ( req, res, next ) => {
  res.setHeader( 'Access-Control-Allow-Origin', '*' );
  res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
  res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' );

  next();
} );

app.use( bodyParser.json() );

app.use( '/api/task', taskRoutes );
app.use( '/api/auth', userRoutes );

module.exports = app;