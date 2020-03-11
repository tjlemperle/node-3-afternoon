require('dotenv').config()

const express = require('express')
      massive = require('massive')
      ctrl = require('./products_controller')
      
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const app = express()


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('DB connected')
})

app.use(express.json())

app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

const port = SERVER_PORT;


app.listen(port, () => console.log(`Server running on port: ${port}`))