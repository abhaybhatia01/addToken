const express = require('express');
const mongoose=require('mongoose');
const TokenPair = require('./models/TokenPair');


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/tokendb' ;
mongoose.connect(dbUrl,{
     useNewUrlParser:true,
     //useCreateIndex:true,
     useUnifiedTopology:true,
});

mongoose.connection.on("error",console.error.bind(console, "connection error:"));
mongoose.connection.once('open',()=>{
    console.log("database connected");
})

const app = express();


app.get("/",(req,res)=>{
    res.send("home");
})


app.post("/addToken",async(req,res)=>{

    const doc = {
        user:"abhay7",
        tokens:"1234",
    }

    const updatedTokenPair = await TokenPair.findOneAndUpdate(
        { "user":doc.user }, 
        { $push: { "tokens": doc.tokens } },
        {new:true}
    );
    if(updatedTokenPair.user){
        res.send(`token pair updated ${updatedTokenPair}`)
    }
    if(!updatedTokenPair){
        const tokenPair = new TokenPair(doc);
        tokenPair.user=doc.user;
        tokenPair.tokens=doc.tokens;
        await tokenPair.save();
        res.send(`new token pair added ${tokenPair}`)
    }
    

})


const port = process.env.PORT ||8080
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})