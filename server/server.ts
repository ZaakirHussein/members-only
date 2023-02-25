import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connect, connection } from 'mongoose';
import { signupRoutes } from './routes/signupRoutes';
import { authRoutes } from './routes/authRoutes';
import { initialize } from 'passport';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const secretCode = process.env.SESSION_SECRET as string;
const mongoDBUri = process.env.ATLAS_URI as string;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: secretCode,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: MongoStore.create({
      mongoUrl: mongoDBUri,
      dbName: 'members-only',
      collectionName: 'sessions',
    }),
  })
);
app.use(initialize());
app.use(session());

app.use('/signup', signupRoutes);
app.use('/login', authRoutes);

export const db = connection;

const connectToDB = () => {
  // Set up MongoDB connection

  connect(mongoDBUri).catch((error) =>
    console.log(`Error connecting to server: ${error}`)
  );

  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', function () {
    console.log('Connected to MongoDB successfully');
  });
};

connectToDB();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
