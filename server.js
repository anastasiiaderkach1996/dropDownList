const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
let db; 
let country;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


MongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true },
    function(err,database){
        if (err) {
            console.log(err);
        } 
        db = database.db('locationTask');
        // db.createCollection('country',function (err, res) {
        //     if (err) throw err;
        //     console.log('colection created');
        // });
        app.listen(3012,function() {
            console.log('API started')
        });
        // add contries
        let countryList = [
            { countryName: 'Ukraine' },
            { countryName: 'Russia' },
            { countryName: 'Poland' },
            { countryName: 'England'}
        ];
        let country = db.collection('country');
        country.find().toArray(function(err, result){
            if (result.length == 0) {
                country.insertMany(countryList, function(err, res){
                    if (err) throw err;
                    console.log('Number of documents inserted :' + res.insertedCount)
            })};
        });
        // add cities
        let citiesList = [
            {citiesName: 'Kyiv', country: 'Ukraine'},
            {citiesName: 'Moscow', country: 'Russia'},
            {citiesName: 'Krakow', country: 'Poland'},
            {citiesName: 'London', country: 'England'},
        ];
        let cities = db.collection('cities');
        cities.find().toArray(function(err, result){
            if(result.length == 0) {
                cities.insertMany(citiesList, function(err, res){
                    if(err) throw err;
                    console.log('Number of documents inserted :' + res.insertedCount)
                });
            };
        });
    
});

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname + '/public'});
    console.log(__dirname);
});

app.get('/api/getCountry', function(req, res) {
    let country = db.collection('country');
    country.find().toArray((err, result) => {
        res.send(result)
    });
});

app.get('/api/cities/getCities', function(req,res){
    let cities = db.collection('cities');
    cities.find().toArray(function(err, result){
        res.send(result)
    })
})


