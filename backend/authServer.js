import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {MongoClient, ObjectId} from 'mongodb'
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



dotenv.config();

const restaurantApp = express();
// const port = process.env.PORT || 5000;
const db_uri = process.env.DB_STRING;
restaurantApp.use(cors());
restaurantApp.use(bodyParser.json());
restaurantApp.use(bodyParser.urlencoded({ extended: false }));
// restaurantApp.use(verifyToken);
MongoClient.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) {
        console.log(`Cannot connect to Database. Error: ${err}`);
    }

    const restaurantDB = client.db('restaurant-data');
    const usersCollection = restaurantDB.collection('users');
    
    console.log('connected to DB collection');

let refreshTokens = [];

    //login user
    restaurantApp.post('/login', async (req, res) => {
        try{
            console.log(req.body);
            //Authenticate user
            const {email, password} = req.body;

            console.log(email);
            // Validate user input
            if (! (email && password)) {
                return res.status(409).send({message: "All Fields are mandatory."});
            } 
            // Validate if user exist in our database
            const user = await usersCollection.findOne({ email });
        
            if(user && (await bcrypt.compare(password, user.password))){
               
                //create Token
                const token =generateAccessToken(user)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_KEY)
                refreshTokens.push(refreshToken);
                return res.status(200).json({token, refreshToken});
            } 
            res.status(400).send("Invalid username or password");

        } catch(err){
            console.log(err);
        }
    })

    restaurantApp.post('/token', async (req,res)=>{
        const refreshToken = req.body.token;

        if (refreshToken === null) return sendStatus(401)
        if(refreshTokens.includes(refreshToken)) return sendStatus(403)
        try{
            const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
            const accessToken = generateAccessToken({name:user.name});
            res.json({accessToken});
        } catch (err) {
            console.log(err);
            sendStatus
        }
    })

    const generateAccessToken =(user)=>{
        const token =jwt.sign(
            {user_id: user._id, email},
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: '15s'
            }
        )
    };
})
restaurantApp.listen(4000, ()=>{
    console.log(`Restaurant App listening on 4000`);
})
