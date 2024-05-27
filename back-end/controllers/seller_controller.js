const { model } = require("mongoose");
const { verifyToken } = require("../config/jwt");
const Property = require("../models/Property")

module.exports.fetchAll = async(req, res)=>{
    try{
        let status = await verifyToken(req.headers.authorization);
        if(!status){
            return res.status(250).json({
                message:"Session Expired! Login again.."
            });
        }
        const allPropertiesArray = await Property.find({seller:status.id}).sort({ updatedAt: -1 });
        const PropertiesIdArray = allPropertiesArray.map(property => property._id);
        return res.status(200).json({
            message:"Received",
            PropertiesIdArray: PropertiesIdArray
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}

module.exports.fetchEach = async(req, res)=>{
    try{
        const PropertyId = req.query.id;
        console.log(PropertyId);
        const currProperty = await Property.find({_id: req.query.id});
        console.log(currProperty[0]);
        return res.status(200).json({
            message:"Received",
            PropertyData: currProperty[0]
        });
    }
    catch(err){
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}