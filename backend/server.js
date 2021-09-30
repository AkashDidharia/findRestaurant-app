import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {MongoClient, ObjectId} from 'mongodb'
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import verifyToken from './middleware/auth.js';


dotenv.config();

const restaurantApp = express();
const port = process.env.PORT || 5000;
const db_uri = process.env.DB_STRING;
restaurantApp.use(cors());
restaurantApp.use(bodyParser.json());
restaurantApp.use(bodyParser.urlencoded({ extended: false }));
// restaurantApp.use(verifyToken);
MongoClient.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) {
        console.log(`Cannot connect to Database. Error: ${err}`);
        // process.exit(-1);
    }

    const restaurantDB = client.db('restaurant-data');
    const restaurantsCollection =restaurantDB.collection('restaurants');
    const queryCollection = restaurantDB.collection('queries');
    const usersCollection = restaurantDB.collection('users');
    
    console.log('connected to DB collection');

    //login user
    restaurantApp.post('/login', async (req, res) => {
        try{
            const {email, password} = req.body;

            // Validate user input
            if (! (email && password)) {
                return res.status(409).json({message: "All Fields are mandatory."});
            } 
            // Validate if user exist in our database
            const user = await usersCollection.findOne({ email });
        
            if(user && (await bcrypt.compare(password, user.password))){
               
                const token =jwt.sign(
                    {userId: user._id, email},
                    process.env.ACCESS_TOKEN_KEY,
                    {
                        expiresIn: "2h"
                    }
                )
                return res.status(200).json({token});
            } 
            res.status(400).json({message:"Invalid username or password"});

        } catch(err){
            console.log(err);
        }
    })


    //signup user
    restaurantApp.post("/register", async (req, res) => {
        try {
          // Get user input
          const { firstName, lastName, email, password } = req.body;
      
          // Validate user input
          if (!(email && password && firstName && lastName)) {
            return res.send("All inputs are required");
          }
          if(password.length < 6) {
            return res.send("Minimum password length must be 6");
          }
      
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await usersCollection.findOne({ email });
      
          if (!!oldUser) {
            return res.send("An account already exists with this email. Please try to Login.");
          }
      
          //Encrypt user password
          const encryptedPassword = await bcrypt.hash(password, 10);
      
          // Create user in our database
          const result = await usersCollection.insertOne({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
          });
          
          res.send("Accout Created Successfully. Click Login to log in.");
      
        } catch (err) {
          console.log(err);
        }
    
    });


    //Restaurant List fetch
    restaurantApp.get('/getListOfPlaces', async (req,res)=>{
        try{
            const sort = { rating: -1 };
            const topTwenty = await restaurantsCollection.find({}).sort(sort).limit(20).toArray();

            res.json(topTwenty);
        } catch (err) {
            console.log(err);
        }
    })

            
//add id to route and request params
    restaurantApp.post('/postQuery', verifyToken, async (req,res)=>{
        try{
        const {restaurantId, userName, phoneNumber, userQuery, } = req.body;
        //--------------Validate User Query-----------
        if(phoneNumber.length !== 10)
        {
            return res.send('Phone number must be of length 10')
        }

        //req.user is from the verifyToken 
        const query = {restaurantId, userName, phoneNumber, userQuery, userId : req.user.userId};

        const result = await queryCollection.insertOne(query);
    
            res.send(`Thanks ${userName}! Your Query is uploaded Successfully!`);
        } catch(error){
             console.error(error)};
    });

    // ------To Insert Restaurant Data----------------
    restaurantApp.post('/postData', async (req,res)=>{
        try{
            const result = await restaurantsCollection.insertMany(req.body);

            res.json(result);
        } catch(error){
            console.error(error)
        }
    });


    
})

restaurantApp.listen(port, ()=>{
    console.log(`Restaurant Server listening on ${port}`);
});
