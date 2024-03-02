require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const mongoDB =  process.env.MONGODB;
const users = require('./models/user.js');
const list = require('./models/rev.js');
const bcrypt = require('bcrypt');
const jwt = require('./controller/jwt.js'); 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const qs = require('qs')


// console.log(jwt, typeof(jwt));
// const jw = jwt("d");
// console.log(express, typeof(express));
// console.log(app, typeof(app));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(express.static('./public'));
// app.use('/static', express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin  : true,
    methods : ["GET", "POST"],
    credentials : true
}));
 

main().catch((err)=>{
    console.log(err,"😊");
});
// console.log(process.env.JWT_SECRET);


app.get('/' , jwt.handler, (req, res)=>{
    // res.render("main");
    // res.send("send");

    res.json({'ok' : '1'});
}) 

app.get('/list', jwt.handler, async(req,res)=>{
    
    // console.log(req.query, "params");
    const doc = await users.findOne({username : req.query.username}).exec();
    console.log(doc, "doc");
    const listItems = await list.find({user:doc._id}).exec();
    res.json({listItems:listItems});
})

app.get('/list/delete', jwt.handler, async(req,res)=>{
        try{
            console.log(req.query, "query");
            // const item = await users.find({});
            // console.log(item);

            const result = await list.deleteOne({_id : req.query.id});
            console.log(result,"list deleted");
            res.status(200).json("deleted");
        }catch(err){
            console.log(err);
            res.status(500).json("error");
        }
})

app.post('/login', async(req, res)=>{
    
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    try{
        const query = await users.find({username: req.body.username}).exec();
        console.log( typeof(users.find({username: req.body.username})), "this is query");
        console.log(query[0], typeof(query.length));


        if(query.length === 0)res.json({error: "invalid credentials"});
        else{
        // res.json("found");
        const dbpassword = query[0].password;
        console.log(dbpassword);
        const check = await bcrypt.compare(req.body.password,dbpassword);
        console.log(check);
       
        //jwt
        if(check)
            {const token =  jwt.createToken(query[0]);
            
                res.cookie("token", token, {
                    maxAge : 300*1000,
                    // httpOnly: true,
                });
                console.log("sent token");
                // res.redirect('/list');
                // res.end(); 
                // res.sendStatus(404);
                res.json({'token': token});
            }
        else res.json({error: "invalid credentials"});
    }
    
    
        
    }catch(err){ 
        console.log(err);
    }
})

app.post('/register', (req,res)=>{
    
    console.log(req.body, "request");
 
    saving(req).catch((err)=>{console.log(err, "saving gives error");
    res.json({error : err});
});
    res.json({message : "registaration done"});
})

app.post('/list', async(req, res)=>{

    const note = req.body.note;
    const user = req.body.username;
    console.log(req.body);
    const doc = await users.findOne({username : user}).exec();
    console.log("doc", doc);
    
    const newNote = new list({
        note : note,
        user : doc._id,
    });

    await newNote.save();
    // console.log(newNote);
    console.log("New note added");
    res.json({status : "Note added"}); 

})

async function main(){
    const state = await mongoose.connect(mongoDB);
    console.log( "CONNECTED");
}


async function saving(reques){
    console.log(reques.body);
    const hash = await bcrypt.hash(reques.body.password, 10);
    const user = new users({
        username: reques.body.username,
        password: hash,
        email: reques.body.email
    });
    await user.save(); 
    console.log("saved");


}




app.listen(port, ()=> {console.log(`Server started at ${port}`)});


// app.use('/', (req,res, next)=>{console.log('route path / is used');
//         next();
// });


// app.get('/first' , (req, res, next)=>{
    //     console.log("2nd time");
//     res.send('first url');
// });

// app.get('/:ipara' , (req, res)=>{
//     res.send(req.params);
// });


// app.use('/first', (req,res, next)=>{console.log('route path /first');
//         next();
// });