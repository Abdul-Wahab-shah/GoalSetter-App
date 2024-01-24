const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel.js");
const User = require("../model/userModel.js");
// @desc     Get goals
// @route    GET /api/goals
// @access   Private

const getGoals= asyncHandler(async (req,res)=>{
   const goal= await Goal.find({user:req.user.id})
    res.status(200).json(goal)
})
// @desc     Set goal
// @route    POST /api/goal
// @access   Private

const setGoal= asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("please add the text")
    }
    const goal= await Goal.create({
        text: req.body.text,
        user:req.user.id,
    })

    res.status(200).json(goal)
})
// @desc     Update goals
// @route    PUT /api/goal/:id
// @access   Private

const updateGoal=asyncHandler (async(req,res)=>{
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('goal not found ')
    }
    const user= await User.findById(req.user.id)
    // check the user

    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('not authorized')
    }
    // Make sure user is goal owner
    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('not authorized')
    }

    const updatedGoal=  await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatedGoal) 

})
// @desc      Delete goal 
// @route    DELETE /api/goal/:id
// @access   Private

const deleteGoal=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('goal not found ')
    }
    const user= await User.findById(req.user.id)
    // check the user

    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('not authorized')
    }
    // Make sure user is goal owner
    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('not authorized')
    }
    const updatedGoal=  await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    await goal.remove()     
    res.status(200).json({id: req.params.id})

})




module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}