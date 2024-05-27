const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    likes: {
        type: Array
    },
    images: {
        type: Array
    },
    village:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    area:{
        type: Number,
        required: true
    },
    address:{
        type: String
    },
    bhk:{
        type: Number,
        required: true
    },
    attachedBathroom:{
        type: Boolean,
        required: true
    },
    hospital:{
        type: Array,
        required:true
    },
    school:{
        type:Array,
        required:true
    },
    interested:{
        type:Array,
        required:true
    },
    rent:{
        type: Number,
        required:true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},{
    timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);