const app = require('express')()

const tipe = require('../controllers/tipe_kamar')
const img = require('../middleware/img')

app.get('/', tipe.findAll)
app.get('/:id', tipe.findOne)
app.post('/', [img.upload.single('foto')], tipe.insert)
app.put('/:id', [img.upload.single('foto')], tipe.update)
app.delete('/:id', tipe.delete)

module.exports = app