const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', (req,res)=>{
   
    res.sendFile(__dirname + '/index.html');
   
})

app.post('/',(req,res)=>{
    
    const query = req.body.cityName;
    const apiKey = "35062848edac1953e82a9109a19e1b69";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query  + "&appid=" + apiKey + "&units=" + unit;

    https.get(url,function(response){
       
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is "+ temp +" degree Celcius</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
           
        })
    })
})

app.listen("3000", function(){
     console.log("Server is running at port 3000")
})

