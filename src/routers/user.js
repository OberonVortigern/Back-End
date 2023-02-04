const app = require('express')()

const user = require('../controllers/user')
const auth = require('../middleware/auth')
const img = require('../middleware/img')

app.get('/', [auth.authorization], user.findAll)
app.get('/:id', [auth.authorization], user.findOne)
app.post('/', [img.upload.single('foto')], user.user)
app.put('/:id', [auth.authorization, img.upload.single('foto')], user.update)
app.delete('/:id', [auth.authorization], user.delete)

module.exports = app