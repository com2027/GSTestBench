const PORT = process.env.PORT || 8888;
const express = require('express');
const app = express();

// INITAL SERVER SETUP
/////////////////////////////////////////////////////////////////////////
//On the root route, serve the index page which is just a HTML page containing the logo
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

//Set express to use static files so we can load the logo
app.use(express.static('public'));

app.listen(PORT, () => console.log(`GSTestBench listening on port ${PORT}!`))

/////////////////////////////////////////////////////////////////////////
