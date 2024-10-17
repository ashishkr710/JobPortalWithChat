import express, { NextFunction, Request, Response } from 'express';
import sequelize from './src/config/database';
import Userdetails from './src/models/Userdetails';
const CORS = require('cors');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes'
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

app.use(CORS({
    origin: true,
    optionsSuccessStatus: 200
}));

app.use(express.static(path.join(__dirname, 'uploads')))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

app.use('/', userRoutes);


const startServer = async () => {
    try {
        await sequelize.authenticate();
        await Userdetails.sync({ force: true });
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    } catch (error: any) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();