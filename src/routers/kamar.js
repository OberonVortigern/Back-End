const app = require('express')()

const kamar = require('../controllers/kamar')
const auth = require('../middleware/auth')

app.get('/', kamar.findAll)
app.get('/:id', kamar.findOne)
app.post('/', [auth.authorization], kamar.insert)
app.put('/:id', [auth.authorization], kamar.update)
app.delete('/:id', [auth.authorization], kamar.delete)

module.exports = app