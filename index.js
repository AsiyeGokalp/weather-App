import express from "express";
import Datastore from "nedb";
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()



const app = express();

app.listen(3000, () => console.log("listening at 3000"));

app.use(express.static("public"));
app.use(express.json());

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

app.post("/api", (req, res) => {
  console.log("I got a request!");
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  res.json(data);
});


app.get("/weather/:latlon",async (req,res) => {
  
  const latlon = req.params.latlon.split(',')
  const lat=latlon[0]
  const lon = latlon[1]
  const api_key = process.env.API_KEY
const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
//const apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b5af33f75912e63bff0bf29c9d0a3822`
const weatherResponse = await fetch(weatherUrl)
const weatherData = await weatherResponse.json()

const aqUrl = `https://api.openaq.org/v1/latest?coordinates = ${lat},${lon}`
const aqResponse = await fetch(aqUrl)
const aqData = await aqResponse.json()
const data = {
  weather : weatherData,
  ai_quality : aqData
}

res.json(data)
})