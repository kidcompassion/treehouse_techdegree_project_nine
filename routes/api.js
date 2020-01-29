var express = require('express');
var router = express.Router();
// Include only models from DB here, Sequelize is in the app file
const { models } = require('../db');

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




// setup a friendly greeting for the root route
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the REST API project!',
    });
});


/**
 * User Routes
 */

 // Get user collection
 router.get('/users', asyncHandler(async (req, res)=>{
    const users = await models.User.findAll();
    res.status(200).json(users);
 }));

 // Get User by ID
 router.get('/users/:id', asyncHandler(async (req, res)=>{
    const user = await models.User.findByPk(req.params.id);
    res.status(200).json(user);
 }));

// Create User
router.post('/users', asyncHandler( async (req,res)=>{
    console.log(req.query);
    const createUser = await models.User.create(req.query);
    res.status(201).send(createUser);
}));
  

// Edit User

router.put('/users/:id', asyncHandler( async (req, res)=>{
    const user = await models.User.findByPk(req.params.id);
    await user.update(req.query);
    res.status(201).end();
}));

// Delete User

router.delete('/users/:id', asyncHandler( async (req, res)=>{
    const user = await models.User.findByPk(req.params.id);
    await user.destroy();
    res.status(201).end();

}));


/**
 * Course Routes
 */

 // Get course collection
 router.get('/courses', asyncHandler(async (req, res)=>{
    const courses = await models.Course.findAll();
    res.status(200).json(courses);
 }));

 // Get course by ID
 router.get('/courses/:id', asyncHandler(async (req, res)=>{
    const course = await models.Course.findByPk(req.params.id);
    res.status(200).json(course);
 }));

 // Create User
router.post('/courses', asyncHandler( async (req,res)=>{
    console.log(req.query);
    const createCourse = await models.Course.create(req.query);
    res.status(201).send(createCourse);
}));



module.exports = router;