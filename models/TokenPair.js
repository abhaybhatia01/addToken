const mongoose = require('mongoose');

const TokenPairSchema = new mongoose.Schema({
    user:String,
    tokens:[String],
});

module.exports= mongoose.model('TokenPair',TokenPairSchema);