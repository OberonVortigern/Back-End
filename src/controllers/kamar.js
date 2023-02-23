const Kamar = require('../models/index').kamar
const TipeKamar = require('../models/index').tipe_kamar
const DetailPemesanan = require('../models/index').detail_pemesanan

const Op = require('sequelize').Op

exports.findAll = async (req, res) => {
    let filter = {
        cek_in : req.query.cin,
        cek_out : req.query.cout,
    }

    if (filter.cek_in && filter.cek_out) {
        let data_kamar = await TipeKamar.findAll({
            attributes: ["id_tipe_kamar", "nama_tipe_kamar"],
            include: [
                {
                    model: Kamar,
                    as: "kamar"
                }
            ]
        })

        let data_kamar_boking = await TipeKamar.findAll({
            attributes: ["id_tipe_kamar", "nama_tipe_kamar"],
            include: [
                {
                    model: Kamar,
                    as: 'kamar',
                    include: {
                        model: DetailPemesanan,
                        as: 'detail_pemesanan',
                        where: {
                            tgl_akses: {
                                [Op.between]: [filter.cek_in, filter.cek_out]
                            }
                        }
                    }
                }
            ]
        })

        let availible = []
        let availible_tipe = []

        for (let i = 0; i < data_kamar.length; i++) {
            data_kamar[i].kamar.forEach(kamar => {
                let isBooked = false
                data_kamar_boking.forEach(bookde => {
                    bookde.kamar.forEach(booked_room => {
                        if (kamar.id_kamar === booked_room.id_kamar) {
                            isBooked = true
                        }
                    })
                })
                if (!isBooked) {
                    availible.push(kamar)
                }
            })
            
        }

        for (let i = 0; i < data_kamar.length; i++) {
            let tipe_kamar = {}
            tipe_kamar.id_tipe_kamar = data_kamar[i].id_tipe_kamar
            tipe_kamar.nama_tipe_kamar = data_kamar[i].nama_tipe_kamar
            tipe_kamar.kamar = []
            availible.forEach(kamar => {
                if (kamar.id_tipe_kamar === data_kamar[i].id_tipe_kamar) {
                    tipe_kamar.kamar.push(kamar)
                }
            })
            if (tipe_kamar.kamar.length > 0) {
                availible_tipe.push(tipe_kamar)
            }
        }

        return res.json({
            message: 'Berhasil mengambil data kamar available',
            kamar_available: availible,
            kamar: availible_tipe
        })
    } else {
        await Kamar.findAll({
            include: ["tipe_kamar"]
        }).then(
            result => res.json({
                message: 'Berhasil mengambil data kamar',
                data: result
            })
        ).catch(
            err => res.json({
                message: err.message
            })
        )
    }
}

exports.findOne = async (req, res) => {
    let id_kamar = req.params.id

    await Kamar.findOne({
        where: {id_kamar},
        include: ['tipe_kamar']
    }).then(
        result => res.json({
            message: `Berhasil mengambil data kamar dengan id ${id_kamar}`,
            data: result
        })
    ).catch(
        err => res.json({
            message: err.message
        })
    )
}

exports.insert = async (req, res) => {
    let data = req.body

    await Kamar.create(data).then(
        () => res.json({
            message: 'Berhasil menambahkan data kamar'
        })
    ).catch(
        err => res.json({
            message: err.message
        })
    )
}

exports.update = async (req, res) => {
    let id_kamar = req.params.id
    await Kamar.findOne({
        where: {id_kamar}
    })
    .then(async result => {
        if (!result) {
            return res.json({
                message: 'Data tidak ditemukan'
            })
        }
        await Kamar.update(req.body, {
            where: {id_kamar}
        })
        .then(() => res.json({
            message: `Berhasil mengubah data kamar dengan id ${id_kamar}`
        }))
        .catch(err => res.json({
            message: err.message
        }))
    })
    .catch(err => res.json({
        message: err.message
    }))
}

exports.delete = async (req, res) => {
    let id_kamar = req.params.id
    await Kamar.findOne({
        where: {id_kamar}
    })
    .then(async result => {
        if (!result) {
            return res.json({
                message: 'Data tidak ditemukan'
            })
        }
        await Kamar.destroy({
            where: {id_kamar}
        })
        .then(() => res.json({
            message: `Berhassil menghapus data kamar dengan id ${id_kamar}`
        }))
        .catch(err => res.json({
            message: err.message
        }))
    })
    .catch(err => res.json({
        message: err.message
    }))
}