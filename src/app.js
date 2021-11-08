// import express
import express, { urlencoded, json } from 'express';

// import packages
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

// import routes
import homeRoute from './routes/home.js'
import classroomsRoute  from './routes/classrooms.js';

// import dotenv
import dotenv from 'dotenv';
dotenv.config();

// start app express
const app = express();

// adding Helmet to enhance API's security
app.use(helmet());

// parse the incoming requests with JSON payloads
app.use(urlencoded({extended: true}));
app.use(json()) 

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


// use router 
app.use('/', homeRoute);
app.use('/classrooms', classroomsRoute);

// connect to mongodb database
mongoose.connect(
    process.env.DB_CONNECTION, 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }
  )
  .then(
    () => console.log('Connected to MongoDB successfully !!!'),
    err => console.log('Connect to MongoDB error:', err)
  ) 

// starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});






