import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {MongoClient, ObjectId} from 'mongodb'
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import verifyToken from './middleware/auth.js';
import validator from 'validator';

dotenv.config();

const restaurantApp = express();
const port = process.env.PORT || 5000;
const db_uri = process.env.DB_STRING;

restaurantApp.use(cors());
restaurantApp.use(bodyParser.json());
restaurantApp.use(bodyParser.urlencoded({ extended: true }));

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

    //Welcome
    restaurantApp.post('/welcome', verifyToken, (req, res) => {
        res.status(200).json({message:'Welcome User'});
    })

    //login user
    restaurantApp.post('/login', async (req, res) => {
        try{
            const {email, password} = req.body;

            // Validate user input
            if (! (email && password)) {
                return res.status(400).json({message:"All Fields are mandatory"});
            } 
            if(!validator.isEmail(email)){
                return res.status(400).json({ message:"Please enter a valid email address"});
            }
    
            // Validate if user exist in our database
            const user = await usersCollection.findOne({ email });
        
            if(user && (await bcrypt.compare(password, user.password))){
               
                const token =jwt.sign(
                    {userId: user.id, email, firstName: user.firstName},
                    process.env.ACCESS_TOKEN_KEY,
                    {
                        expiresIn: "8h"
                    }
                );

                return res.status(200).json({token});
            } 
            res.status(401).json({message:"Invalid username or password"});

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
            return res.status(400).json({ message:"All inputs are required"});
          }

          if(!validator.isEmail(email)){
            return res.status(400).json({ message:"Please enter a valid email address"});
          }

          if(password.length < 6) {
            return res.status(400).json({ message:"Password must be of atleast 6 characters"});
          }
      
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await usersCollection.findOne({ email });
      
          if (!!oldUser) {
            return res.status(409).json({ message:"Email already registered. Please Login."});
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
          
          const token =jwt.sign(
            {userId: result.insertedId, email},
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: "8h"
            }
        );
        
        return res.status(200).json({token});
      
        } catch (err) {
          console.log(err);
        }
    
    });


    //Restaurant List fetch
    restaurantApp.get('/getListOfPlaces', async (req,res)=>{
        try{
            const sort = { rating: -1 };
            const topTwenty = await restaurantsCollection.find({}).sort(sort).limit(20).toArray();

            res.status(200).json({topTwenty});
            
        } catch (err) {
            console.log(err);
        }
    })

            
    //post the user query 
    restaurantApp.post('/postQuery', verifyToken, async (req,res)=>{
        try{
        const {restaurantId, userName, phoneNumber, userQuery, } = req.body;
        //--------------Validate User Query-----------
        if(!(userName && userQuery)){
            return res.status(400).json({message: "All fields are required"})
        }
        if(phoneNumber.length !== 10)
        {
            return res.status(400).json({message: 'Phone number must be of 10 digits'})
        }

        //req.user is from the verifyToken 
        const query = {restaurantId, userName, phoneNumber, userQuery, userId : req.user.userId};

        const result = await queryCollection.insertOne(query);
    
            res.status(200).json({message: `Thanks ${userName}! Your Query is uploaded Successfully!`});
        } catch(error){
             console.error(error)};
    });

    // ------To Insert Restaurant Data----------------
//     restaurantApp.post('/postData', async (req,res)=>{
//         try{
//             const result = await restaurantsCollection.insertMany(req.body);

//             res.json(result);
//         } catch(error){
//             console.error(error)
//         }
//     });

    restaurantApp.listen(port, ()=>{
        console.log(`Restaurant Server listening on ${port}`);
    });
})


export default restaurantApp;