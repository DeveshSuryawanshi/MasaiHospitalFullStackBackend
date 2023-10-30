const jwt = require("jsonwebtoken");
const {BlacklistModel} = require("../Models/blacklist.model");

const auth = async(req, res, next) =>{
    try {
        const token = req.headers.authorization;
        if(token){
            let existingToken = await BlacklistModel.find({
                blacklist : {$in : token},
            })

            if(existingToken.length > 0){
                return res.status(400).json({"error" : "Please Login first!!"});
            }else{
                let decoded = jwt.verify(token, "masai");
                req.body.userID = decoded.userID;
                return next();
            }
        }else{
            res.status(400).json({"error" : "Please Login first!!"});
        }
    } catch (error) {
        return res.status(400).json({"error" : error.message});
    }
}

module.exports = {
    auth
}