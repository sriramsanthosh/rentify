const { verifyToken } = require("../config/jwt");
const Property = require("../models/Property");

module.exports.fetchAll = async(req, res)=>{
    try{
        const allPropertiesArray = await Property.find({}).sort({ updatedAt: -1 });
        const PropertiesIdArray = allPropertiesArray.map(property => property._id);
        return res.status(200).json({
            message:"Fetched",
            PropertiesIdArray: await PropertiesIdArray
        });
    }
    catch(err){
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

module.exports.register = async(req, res)=>{
    try{
        let status = await verifyToken(req.headers.authorization);
        if(!status){
            return res.status(250).json({
                message:"Session Expired! Login again.."
            });
        }
        req.body.seller = status.id;
        const NewProperty = await Property.create(req.body);
        console.log("New Property Created");
        return res.status(200).json({
            message: "Uploaded"
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

module.exports.toggleLike = async(req, res)=>{
    try{
        console.log(req.query);
        return res.status(200).json({
            message:"Liked"
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

module.exports.fetchProperty = async(req, res)=>{
    try{
        const PropertyId = req.query.id;
        console.log(PropertyId);
        const currProperty = await Property.find({_id: req.query.id}).populate({
                      path: 'seller',
                      select: '-password' // Exclude the password field
                    });;
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

module.exports.delete = async(req, res)=>{
    try{
        console.log("Deleted");
        const decoded = await verifyToken(req.headers.authorization);
        if(decoded.id !== req.query.sellerId){
            return res.status(203).json({
                message:"Access Denied.. You can't delete this"
            });
        }
        await Property.deleteOne({_id: req.query.id});
        return res.status(200).json({
            message:"Deleted.."
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}