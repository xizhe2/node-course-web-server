const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
//to creat an app just need to call the method express()
var app = express();
var fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');  //page template

//middleware: take a function, next will tell express when middleware is done then can fire api
app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// //this middleware will stop everything after car without next().
// app.use((req, res, next) => {
//   res.render('maintance.hbs');
// });

//middleware: static take absolu path
app.use(express.static(__dirname + '/public'));

//args: helper name & arrow function, when helper calls, arrow function will render return data
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

//http routs handler:
// ex: if someone make a rout request, we need to send sth back:data, htmlPage
//http handler setting
//arg1: url, agr2: arrow function to run, it will tell url what to send back to the request
// req: store the request infor come in like header,body infor;
// res:data, http static code...
app.get('/', (req, res) =>{
  // res.send('<h1>Hello Express!</h>');
  //page name, data we want to send like an obj,etc
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Bad request'
  });
});



app.listen(port, () =>{
  console.log(`Server ${port} is listenning!`);
});
