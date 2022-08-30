const express = require('express')
const ObjectId = require('mongoose').Types.ObjectId; 
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcryptjs')
router.get('/',async (req,res)=>{
    const users = await UsersModel.find();
    res.send(users.map((users)=> users.toJSON()))
})
//User Profile (get)
router.get('/:user/information',async (req,res)=>{

    
    const findUser = await UsersModel.findOne({_id:ObjectId(req.params.user)})
    newFindUser = {
        "_id":findUser._id,
        "username":findUser.username,
        "age":findUser.age,
        "weight":findUser.weight,
        "height":findUser.height,
        "bmi":findUser.bmi,
        "user_photo":findUser.user_photo
    }
    res.send(newFindUser)
   
})

router.post('/', async (req,res)=>{
  
    
    const users = new UsersModel(req.body);
    const validateResult = users.validateSync();
    if(validateResult){
        return res.status(400).send(validateResult)
    }
    await users.save();
    return res.send(users.toJSON())
    
})
//login
router.post('/login',async (req,res)=>{
        try{
        const {username,password} = req.body
        const loginResponse = {
            "status":"none",
            "username_id":"",
            "username":""
        }
        

        if(!(username && password)){
            res.status(400).send("input is required")
        }
        
        const user = await UsersModel.findOne({username})

   
        if (user && (await bcrypt.compareSync(password,user.password))){
       

            loginResponse.status = "OK"
            loginResponse.username_id = user._id
            loginResponse.username = user.username
            loginResponse.user_photo = user.user_photo
            res.status(200).json(loginResponse)
      

        } else {
            loginResponse.status = "none"
            res.status(400).json(loginResponse)
        }
    }catch(err){
        res.status(400).json(err)
    }

    }
)

//register
router.post ('/register', async (req, res) => {

   
    const {username,password,age,weight,height,bmi,user_photo} = req.body
    if (!(username && password && age && weight && height && bmi && user_photo)){
        res.status(400).send("not input")
    }
    const oldUser = await UsersModel.findOne({username:username})

    if(oldUser){
        res.status(409).send("use Already")
    } else {
        const newUser = await new UsersModel (req.body);
        const validateResult = newUser.validateSync ();
    
        if (validateResult) {
            return res.status(404).send (validateResult)
        }

        const salt = await bcrypt.genSaltSync(10);
        newUser.password = await bcrypt.hashSync(newUser.password, salt);

        await newUser.save ();
      
        res.send(newUser);
    }
    
});




module.exports = router