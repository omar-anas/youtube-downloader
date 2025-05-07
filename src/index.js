const path = require("path");
const play = require('play-dl'); // Import play-dl
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

    const URL = req.query.URL;

    try {
        const info = await play.video_info(URL); // Use play.video_info
        res.status(200).json(info.video_details); // Adjust response based on play-dl's info object
    } catch (error) {
        console.error("Error fetching info:", error);
        res.status(500).json({ error: 'Failed to fetch video info.' });
    }
});

app.get('/download',(req,res)=>{
    const videoName = req.query.title;

    res.set('Content-Disposition', 'attachment; filename='+encodeURI(videoName) +'.mp3');
    const videoURL = req.query.URL;

    play.stream(videoURL, {
        discord_player_compatibility : true, // Optional: for compatibility with Discord music bots
        quality: 0 // Highest audio quality
    }).then(stream => {
        stream.pipe(res);
    }).catch(error => {
        console.error("Error downloading audio:", error);
        res.status(500).send('Failed to download audio.');
    });
});

app.listen(port,()=>{
    console.log("this app on",port);
})