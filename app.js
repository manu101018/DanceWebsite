const express = require("express");
const path = require("path"); 
const app = express();
const bodyparser = require('body-parser');
var mongoose = require('mongoose');
const port = 8000;

//Database related stuff
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true});

//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
});

var contact = mongoose.model('contact',contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('/views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res)=>{ 
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{ 
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send('This item has been saved to the database');
    }).catch(()=>{
        res.status(400).send('Item was not send to the database')
    });
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});