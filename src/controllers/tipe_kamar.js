const path = require('path')
const fs = require('fs')

const TipeKamar = require('../models/index').tipe_kamar

const Op = require('sequelize').Op

exports.findAll = async (req, res) => {
    let filter = req.query.find

    if (filter != null) {
        await TipeKamar.findAll({
            where: {
                [Op.or]: {
                    nama_tipe_kamar: {
                        [Op.like]: `%${[filter]}%`,
                    },
                    harga: {
                        [Op.like]: `%${[filter]}%`,
                    },
                    deskripsi: {
                        [Op.like]: `%${[filter]}%`,
                    }
                }
            }
        }).then(
            result => res.json({
                message: `Berhasil mengambil data dengan filter: ${filter}`,
                data: result
            })
        ).catch(
            err => res.json({
                message: err.message
            })
        )
    } else {
        await TipeKamar.findAll().then(
            result => res.json({
                message: 'Berhasil mengambil semua data',
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
    let id_tipe_kamar = req.params.id
    await TipeKamar.findOne({
        where: {id_tipe_kamar}
    }).then(
        result => res.json({
            message: `Berhasil mengambil data tipe kamar dengan id ${id_tipe_kamar}`,
            data: result
        })
    ).catch(
        err => res.json({
            message: err.message
        })
    )
}

exports.insert = async (req, res) => {
    let data = {
        ...req.body,
        foto: req.file.filename
    }
    await TipeKamar.create(data).then(
        () => res.json({
            message: 'Berhasil menambahkan data tipe kamar'
        })
    ).catch(
        err => res.json({
            message: err.message
        })
    )
}

exports.update = async (req, res) => {
    let id_tipe_kamar = req.params.id
    let data = req.body
    let oldFileName

    await TipeKamar.findOne({
        where: {id_tipe_kamar},
        attributes: ['foto']
    }).then(
        result => {
            if (!result) {
                return res.json({
                    message: 'Data tidak ditemukan'
                })
            }
            oldFileName = result.foto
        }
    ).catch(
        err => res.json({
            message: err.message
        })
    )
    
    if (req.file) {
        let location = path.join(__dirname, '../../public/img', oldFileName)
        fs.unlink(location, err => console.log(err))
        data.foto = req.file.filename
    } else {
        data.foto = oldFileName
    }
    
    await TipeKamar.update(data, {
        where: {id_tipe_kamar}
    }).then(
        () => res.json({
            message: `Berhasil mengubah data tipe kamar dengan id ${id_tipe_kamar}`
        })
    ).catch(
        err => res.json({
            message: err.message
        })
    )
}

exports.delete = async (req, res) => {
    let id_tipe_kamar = req.params.id

    await TipeKamar.findOne({
        where: {id_tipe_kamar},
        attributes: ['foto']
    }).then(
        result => {
            if (!result) {
                return res.json({
                    message: 'Data tidak ditemukan'
                })
            }
            let oldFileName = result.foto
            let location = path.join(__dirname, '../../public/img', oldFileName)
            fs.unlink(location, error => console.log(error))
        }
    ).catch(
        err => res.json({
            message: err.message
        })
    )
    
    await TipeKamar.destroy({
        where: {id_tipe_kamar}
    }).then(
        () => res.json({
            message: `Berhasil menghapus tipe kamar dengan id ${id_tipe_kamar}`
        })
    ).catch(
        err => res.json({
            message: err.message
        })
    )
}