const mongoose= require('mongoose')

const JobSchema= new mongoose.Schema({
    company:{
        type:String,
        maxLength:50,
        required:[true,"Company is required"]
    },
    position:{
        type:String,
        maxLength:100,
        required:[true,"Position is required"]
    },
    status:{
        type:String,
        enum:["interview","declined","pending"],
        default:"pending"
    },
    jobType:{
        type:String,
        enum:["full-time","part-time","remote","internship"],
        default:"full-time"
    },
    jobLocation:{
        type:String,
        default:"my-city",
        required:[true,"jobLocation is required"]
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"User is required"]
    },

},{
    timestamps:true
})



const Job= new mongoose.model("job",JobSchema,)
module.exports= Job;