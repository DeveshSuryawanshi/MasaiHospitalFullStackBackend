const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
    blacklist : [String],
})

const BlacklistModel = mongoose.model("blacklist", blacklistSchema);

module.exports={
    BlacklistModel
}