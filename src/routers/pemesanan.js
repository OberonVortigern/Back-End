const app = require('express')()

const pemesanan = require('../controllers/pemesanan')

app.get('/', pemesanan.findAll)

module.exports = app