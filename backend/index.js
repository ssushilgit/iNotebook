const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
// var app = express()



connectToMongo();
const app = express()
const port = 5000


app.use(cors())
app.use(express.json()) //middleware required to use request.body
// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Sushil Shrestha!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})   
