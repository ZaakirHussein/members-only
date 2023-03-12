import { connect, connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBUri = process.env.ATLAS_URI as string;

export const DbConnection = connection;

export const connectToDB = () => {
  // Set up MongoDB connection

  connect(mongoDBUri).catch((error) =>
    console.log(`Error connecting to server: ${error}`)
  );

  DbConnection.on('error', console.error.bind(console, 'connection error: '));
  DbConnection.once('open', function () {
    console.log('Connected to MongoDB successfully');
  });
};
