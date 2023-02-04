const Kamar = require('../models/index').kamar

exports.findAll = async (req, res) => {
    let filter = {
        cek_in : req.query.cin,
        cek_out : req.query.cout
    }
    if (filter.cek_in && filter.cek_out) {
        return res.json(filter)
    }
    await Kamar.findAll()
    .then(result => res.json({
        message: 'Berhasil mengambil data kamar',
        data: result
    }))
    .catch(err => res.json({
        message: err.message
    }))
}

exports.findOne = async (req, res) => {
    let id_kamar = req.params.id
    await Kamar.findOne({
        where: {id_kamar},
        include: ['tipe_kamar']
    })
    .then(result => res.json({
        message: `Berhasil mengambil data kamar dengan id ${id_kamar}`,
        data: result
    }))
    .catch(err => res.json({
        message: err.message
    }))
}

exports.insert = async (req, res) => {
    let data = req.body
    await Kamar.create(data)
    .then(() => res.json({
        message: 'Berhasil menambahkan data kamar'
    }))
    .catch(err => res.json({
        message: err.message
    }))
}

exports.update = async (req, res) => {
    let id_kamar = req.params.id
    await Kamar.update(req.body, {
        where: {id_kamar}
    })
    .then(() => res.json({
        message: `Berhasil mengubah data kamar dengan id ${id_kamar}`
    }))
    .catch(err => res.json({
        message: err.message
    }))
}

exports.delete = async (req, res) => {
    let id_kamar = req.params.id
    await Kamar.destroy({
        where: {id_kamar}
    })
    .then(() => res.json({
        message: `Berhassil menghapus data kamar dengan id ${id_kamar}`
    }))
    .catch(err => res.json({
        message: err.message
    }))
}