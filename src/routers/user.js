const app = require('express')()

const user = require('../controllers/user')
const auth = require('../middleware/auth')
const valid = require('../middleware/valid')
const img = require('../middleware/img')

app.get('/', [auth.authorization], user.findAll)
app.get('/:id', [auth.authorization], user.findOne)
app.post('/', user.login)
app.post('/register', [auth.authorization, valid.validate, img.upload.single('foto')], user.register)
app.put('/:id', [auth.authorization, valid.validate, img.upload.single('foto')], user.update)
app.delete('/:id', [auth.authorization], user.delete)

module.exports = app