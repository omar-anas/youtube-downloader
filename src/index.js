const path = require("path");
const ytdl = require('ytdl-core');
const fs =require('fs')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pass = path.join(__dirname,'../public');
app.use(express.static(pass));
app.use(express.json());

app.get('/info',async (req,res)=>{
    if(!req.query.URL){
        return res.send({error:'you must provide a LINK!'});
    }
    
    
    const URL = req.query.URL
    
    const info = await ytdl.getInfo(URL);
    
    
    res.status(200).json(info);



    

})

app.get('/download',(req,res)=>{
    const videoName = req.query.title;
    console.log(videoName)   ;
    res.set('Content-Disposition', 'attachment; filename=' +    videoName + '.mp3');
   const videoURL = req.query.URL;

   
   ytdl(videoURL,{
            filter: "audioonly"
        }).pipe(res);


});






app.listen(port,()=>{

    console.log("this app on",port);
})