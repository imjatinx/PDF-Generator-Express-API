const mongoose= require("mongoose")

const Course= mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true,
    },
   
    videos:{
        type:Number,
        require:true,
    },
    active:{
       type:Boolean,
       
    }

});

//
//module.exports=mongoose.Model("courses",Course)