const {sign, verify} = require('jsonwebtoken');

const createToken = (user)=>{
    const token = sign({username: user.username}, process.env.JWT_SECRET);
    return token;
}
 
const handler = (req, res, next) => {
    const cookie = req.cookies["token"];
    console.log(req.cookies);
    if(!cookie){res.json({"error":"provide token"});
    }

    try{
    const check = verify(cookie, process.env.JWT_SECRET);    
    }
    catch(err){
        console.log(err);
        res.status(404).json({"error":""});
    }
    next();

}

module.exports.createToken = createToken;
module.exports.handler = handler;