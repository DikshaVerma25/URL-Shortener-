const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mysql = require('mysql');

const app = express();
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "urlshort"
});

con.connect(function(error) {
  if (error) {
    console.log("Database connection failed");
  } else {
    console.log("Database connected successfully");
  }
});

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.json({
    message: 'UrlShort - Short urls for the code'
  });
});

app.post("/api/create-short-url", function(req, res) {
  let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi, '').substr(2, 10);
  let sql = `INSERT INTO links(longurl, shorturlid) VALUES('${req.body.longurl}' , '${uniqueID}')`;
  con.query(sql, function(error, result) {
    if (error) {
      res.status(500).json({
        status: "notok",
        message: "Something went wrong"
      });
    } else {
      res.status(200).json({
        status: "ok",
        shorturlid: uniqueID
      });
    }
  });
});

app.get('/url/:id', (req, res) => {
  // TODO: Implement logic to retrieve short URL by ID
  res.send("Retrieve short URL by ID");
});

app.get('/:id', (req, res) => {
  // TODO: Implement logic for redirecting to URL
  res.send("Redirect to URL");
});

app.post('/url', (req, res) => {
  // TODO: Implement logic for creating a short URL
  res.send("Create a short URL");
});

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
