const app = require('express')()

const kamar = require('../controllers/kamar')

app.get('/', kamar.findAll)
app.get('/:id', kamar.findOne)
app.post('/', kamar.insert)
app.put('/:id', kamar.update)
app.delete('/:id', kamar.delete)

module.exports = app