// const express = require('express')
import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import cors from "cors";
app.use(cors());
app.use(express.json());

//user route
import userRoutes from "./routes/userRoutes.js"
app.use('/api/users/', userRoutes)

//dbconnect
import connect from './dbconnect.js';
connect();


app.listen(8000, () => {
    console.log('The server has started! Oh Yea');
});