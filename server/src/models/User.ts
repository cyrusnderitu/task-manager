// File for creating User Model and how (datatype i.e strings, numbers etc) they will be stored in the database

import mongoose, { Document, Schema } from 'mongoose';

// Define the structure of a User object - Typescript modeling
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Create a schema to describe how data is saved in MongoDB - MongoDB Modelling
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true, // name is mandatory
    },
    email: {
      type: String,
      required: true,
      unique: true, // no two users should have same email
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt fields automatically
);

// Create and export the model
export default mongoose.model<IUser>('User', userSchema);
