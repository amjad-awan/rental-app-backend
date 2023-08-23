import mongoose from "mongoose"

const vehicleSchama=new mongoose.Schema({
    vehicletype:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
isbooked:{
type:Boolean,
default:false
},
    vehiclename:{
        type:String,
        require:true
    },
 
    fueltype:{
        type:String,
        require:true
    },
    vehiclemodal:{
        type:Number,
        require:true
    },
    picture:{
        type:String,
        require:true
    },
    cloudinarypictureId:{
        type:String,
        require:true
    },
    cc:{
        type:Number,
        require:true
    },
    rent:{
        type:Number,
        require:true
    },
},{
    timestamps:true
})

export default mongoose.model("vehicles", vehicleSchama)