const Pemeanan = require('../models/pemesanan')

exports.findAll = async (_req, res) => {
    await Pemeanan.findAll({
        include: ['tipe_Kamar', 'user']
    })
    .then(result => res.json({
        message: 'Berhasil mengambil data pemesanan',
        data: result
    }))
    .catch(err => res.json({
        message: err.message
    }))
}

exports.insert = async (req, res) => {
}