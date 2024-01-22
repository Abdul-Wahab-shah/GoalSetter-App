const asyncHandler = require("express-async-handler");
// @desc     Get goals
// @route    GET /api/goals
// @access   Private

const getGoals= asyncHandler(async (req,res)=>{
   
    res.status(200).json({message:"Read goals"})
})
// @desc     Set goal
// @route    POST /api/goal
// @access   Private

const setGoal= asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("please add the text")
    }
    res.status(200).json({message:"Create goals"})
})
// @desc     Update goals
// @route    PUT /api/goal/:id
// @access   Private

const updateGoal=asyncHandler (async(req,res)=>{
    res.status(200).json({message:`Update goals ${req.params.id}`})

})
// @desc      Delete goal 
// @route    DELETE /api/goal/:id
// @access   Private

const deleteGoal=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Update goals ${req.params.id}`})

})




module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}