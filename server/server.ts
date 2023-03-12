import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './db/conn';
import { signupRoutes } from './routes/signupRoutes';
import { authRoutes } from './routes/authRoutes';
import passport from 'passport';
import { jwtStrat as JWTStrategy } from './controllers/authController';

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

// Passport middleware
app.use(passport.initialize());
passport.use(JWTStrategy);

app.use('/signup', signupRoutes);
app.use('/login', authRoutes);

app.listen(port, () => {
  connectToDB();
  console.log(`Server is running on port: ${port}`);
});
