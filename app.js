const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');


//  creting instance of express
const app = express();
const port = process.env.PORT || '3000';

app.use(morgan('tiny'));

// Let express know that there is a static directory where we are setting static files
app.use(express.static(path.join(__dirname, '/public/')));


app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }];

const bookRouter = require('./src/routes/bookRoute')(nav);

app.use('/books', bookRouter);

// get method
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
      title: 'My Library',
    },
  );
});

// express listen on port 4000 or 3000
app.listen(port, () => {
  debug(`Listenting on port ${chalk.green(port)}`);
});
