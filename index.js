const express = require('express');
const app = express();
const parse = require('body-parser');
const path = require('path');
const home = require('./components/routes/home');
const highScores = require('./components/routes/highScores');
const end = require('./components/routes/end');
const game = require('./components/routes/game');
const expressHbs = require('express-handlebars');
const level = require('./components/routes/level');
const compression = require('compression');

const PORT = process.env.PORT || 3000;

app.use(compression());
app.engine(
    'hbs',
    expressHbs.engine({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');


app.use(parse.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, '/components/public')));
app.use('/', home);

app.use(highScores);

app.use(end);

app.use(game);

app.use(level);


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
}
);

