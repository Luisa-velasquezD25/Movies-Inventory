const express = require('express') 
const { getConnection } = require('./db/connect-mongo')
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/director', require('./routes/director'))
app.use('/gender', require('./routes/gender'))
app.use('/producer', require('./routes/producer'))
app.use('/type', require('./routes/type'))
app.use('/media', require('./routes/media'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

