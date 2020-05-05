const express=require("express");
const https=require("https");
var request=require("request");
const app=express();
const bodyParser=require("body-parser");
var d = new Date();
var icon="";
var cityw="bali";
var date=d.toDateString();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(express.static('public'));
  app.get('/',function(req,res){


    const apiKey="a25623fbff2d86506e864b22bc6c7e9e";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityw+"&appid="+apiKey+"&units=metric";

  request(url,function(error,response,body){
      const weatherData=JSON.parse(body);
      console.log(weatherData);
      const temp=Math.round(weatherData.main.temp);
       icon=weatherData.weather[0].icon;
       console.log(icon[2]);
      const descp=weatherData.weather[0].description;
      const humidity=weatherData.main.humidity;
      const windspeed=weatherData.wind.speed;
      const pressure=weatherData.main.pressure;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"

    res.render('index',{
      temperture:temp,
      description:descp,
      source:imageURL,
      city:cityw ,
      Dates:date,
      humid:humidity,
      wspeed:windspeed,
      press:pressure,

    })

    })
  })
 app.post('/',function(req,res){
cityw=req.body.cityname;
res.redirect('/');

});


app.listen(3000);
