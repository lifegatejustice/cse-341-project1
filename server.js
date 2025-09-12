const express = require('express');
const mongodb = require('./data/database');
const { swaggerUi, specs } = require('./swagger');
const app = express();

const port = process.env.PORT || 3000;

// Add JSON body parser middleware
app.use(express.json());

// Swagger setup to serve static swagger.json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log(`Connected to DB and listening on port ${port}`)});
  }
});
