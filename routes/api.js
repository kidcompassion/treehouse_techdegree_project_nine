var express = require('express');
var router = express.Router();
const bcryptjs = require('bcryptjs');
var auth = require('basic-auth');

const { User, Course } = require('../models');


/**
 * Helpers
 * @param {} callback 
 */

const asyncHandler = (callback)=>{
    return async(req, res, next) =>{
        try{
            await callback(req, res, next);
        }
        catch(error){
            res.status(500).send(error);
        }
    }
}
/**
 * Authentication Function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const authenticateUser = async (req, res, next) => {
    
    //Get auth headers
    const credentials = auth(req);
    
    if(credentials){

        let userPassword = '';
        
        // Get the user based on auth header email
        const userLookup = await User.findAll({
                                    attributes:["password"],
                                    where: {
                                        emailAddress: credentials.name
                                        
                                    }
                                });

        // Get hashed password and set it to var for comparing
        userLookup.map((user)=> userPassword = user.password);
                            
        // Compare password to one in DB
        const passwordMatch = bcryptjs.compareSync(credentials.pass, userPassword);
        
        // If correct password, set current user property
        if(passwordMatch){
            req.currentUser = userLookup;
        } else {
            res.status(401).end;
        }
    }
    
    next();
  };
  


// setup a friendly greeting for the root route
router.get('/', authenticateUser, (req, res) => {
    //console.log(req.headers);
    //const credentials = auth(req);
    //var user = auth.parse(req.getHeader('Proxy-Authorization'))

    res.json({
        message: 'Welcome to the REST API project!',
    });
});


/**
 * User Routes
 */

 // Get user collection
 router.get('/users', asyncHandler(async (req, res)=>{
    const users = await User.findAll();
    res.status(200).json(users);
 }));

 // Get User by ID
 router.get('/users/:id', asyncHandler(async (req, res)=>{
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
 }));

// Create User
router.post('/users', asyncHandler( async (req,res)=>{
    console.log(req.query);
    const createUser = await User.create({
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        emailAddress: req.query.emailAddress,
        password: bcryptjs.hashSync(req.query.password)

    });

    if(createUser){
        res.status(201).send(createUser);
    } else {
        res.status(400).end;
    }
    
}));
  

// Edit User

router.put('/users/:id', asyncHandler( async (req, res)=>{
    const user = await User.findByPk(req.params.id);
    await user.update(req.query);
    res.status(204).end();
}));

// Delete User

router.delete('/users/:id', asyncHandler( async (req, res)=>{
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.status(204).end();

}));


/**
 * Course Routes
 */

 // Get course collection
 router.get('/courses', asyncHandler(async (req, res)=>{
    const courses = await Course.findAll({
        include: {
            model: User
        }
    });
    res.status(200).json(courses);
 }));

 router.get('/courses/:id', asyncHandler(async (req, res)=>{
    const course = await Course.findByPk(req.params.id);
    res.status(200).json(course);
 }));


 // Get course by ID
 router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res)=>{
    const course = await Course.findByPk(req.params.id);
    await Course.update(req.query);
    res.status(204).json(course);
 }));

 // Create User
router.post('/courses', authenticateUser, asyncHandler( async (req,res)=>{
    const createCourse = await Course.create(req.query);

    res.status(201).send(createCourse);
}));


router.delete('/courses/:id', authenticateUser, asyncHandler( async (req, res)=>{
    const course = await Course.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();

}));


module.exports = router;