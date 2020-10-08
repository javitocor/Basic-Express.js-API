const express = require('express')
const app = express();
const path = require('path');
const port = 5000;
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members')
/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

// init middleware
app.use(logger)

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// homepage route
app.get('/', (req, res) =>{
  res.render('index', {title: 'Member App', members})
})
//set static folder
app.use(express.static(path.join(__dirname, 'public')));
// members API routes
app.use('/api/members', require('./routes/api/members'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});