import express from 'express';

import apiRouter from './Api-Router/routers';

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`server listen on port - ${PORT}`);
});
