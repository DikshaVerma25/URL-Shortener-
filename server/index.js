const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.get('/' , (req, res) => {
    res.json({
        message: 'UrlShort - Short urls for the code'
    });
});

app.get('/url/:id' , (req, res) => {
    //TODO: requesting the short url by id 
 });

app.get('/:id' , (req, res) => {
    //TODO: Here we will be redirecting to URL
 });

app.post('/url' , (req, res) => {
   //TODO: creating a short url for the given long 
});



const port= process.env.PORT || 1337;

app.listen(port , () =>{
    console.log(`Listening at http://localhost:${port}`);

})