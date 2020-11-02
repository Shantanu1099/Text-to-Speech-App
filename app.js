const express = require("express");

const bodyParser = require("body-parser");

const gtts = require('gtts')

//init fs
const fs = require("fs");

//init express app
const app = express();

app.use(bodyParser.urlencoded({ 
  extended: false 
}));

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;


app.get('/texttospeechaudio',(req,res) => {
  res.render('texttospeechaudio',{title:"Text-to-speech-audio"})
})

app.post('/texttospeechaudio',(req,res) => {
  let text = req.body.text

  let language = req.body.language

  let outputFilePath = Date.now() + "output.mp3"

  let voice = new gtts(text,language)

  voice.save(outputFilePath,function(err,result){
    if(err){
      fs.unlinkSync(outputFilePath)
      res.send("Sorry! Unable to convert to audio")
    }


    res.download(outputFilePath,(err) => {
      if(err){
        fs.unlinkSync(outputFilePath)
        res.send("Unable to download the file")
      }
       fs.unlinkSync(outputFilePath)

    })
  })
})

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});