let express = require('express');
let app = express();

console.log('Hello World');

//middleware function
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${req.ip}`);
  next();
};

//mount middleware to the root level
app.use(logger);

// use public assets
app.use("/public", express.static(__dirname + "/public"));

// create route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const currentDate = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

// route for /now page
app.get('/now', currentDate, (req, res) => {
  res.json({ time: req.time });
  next();
  }
);

// create a route for a JSON endpoint
app.get('/json', (req, res) => {

  if (process.env['MESSAGE_STYLE'] === 'uppercase') {
      res.json({"message": "HELLO JSON"});
    // console.log('UPPER CASE');
  }
    res.json({"message": "Hello json"});
    // console.log('lower case');
});

// create route for parameter input from client
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
  }
);

// post handler function
const handler = (req, res) => {
  const first = req.query.first || 'Nojan';
  const last = req.query.last || 'Dals';
  // res.send(`Hello ${first} ${last}`);
  res.json({ name: `${first} ${last}` })
};

// create API endpoint at /name route
app.route('/name').get(handler);
























 module.exports = app;























 module.exports = app;
