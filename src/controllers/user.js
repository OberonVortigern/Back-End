const md5 = require('md5')
const createToken = require('../middleware/jwt')

const path = require('path')
const fs = require('fs')

const User = require('../models/index').user

exports.login = async (req, res) => {
    let data = {
        ...req.body,
        password: md5(req.body.password)
    }
    await User.findOne({
        where: data,
        attributes: ['id_user', 'role']
    })
    .then(result => {
        if (result) {
            let token = createToken(result)
            return res.json({
                message: 'Berhasil Login',
                logged: true,
                token,
                data: result
            })
        }
        return res.json({
            message: `username ${data.nama_user} tidak ditemukan atau password tidak cocok`
        })
    })
    .catch(err => res.json({
        message: err.message,
        logged: false
    }))
}

exports.register = async (req, res) => {
    let data = {
        ...req.body,
        password: md5(req.body.password),
        foto: req.file.filename
    }
    await User.findAll({
        where: {
            nama_user: data.nama_user
        }
    })
    .then(async result => {
        if (result.length == 0) {
            await User.create(data)
            .then(() => res.json({
                message: 'Berhasil Registrasi'
            }))
            .catch(err =>  res.json({
                message: err.message
            }))
        } else {
            return res.json({
                message: 'Username sudah digunakan'
            })
        }
    })
    .catch(err => res.json({
        message: err.message
    }))
}

exports.findAll = async (_req, res) => {
    await User.findAll()
    .then(result => res.json({
        message: 'Berhasil mengambil semua data',
        data: result
    }))
    .catch(err => res.json({
        message: err.message
    }))
}

exports.findOne = async (req, res) => {
    let id_user = req.params.id
    await User.findOne({
        where: {id_user}
    })
    .then(result => res.json({
        message: `Berhasil mengambil user dengan id ${id_user}`,
        data: result
    }))
    .catch(err => res.json({
        message: err.message
    }))

}

exports.update = async (req, res) => {
    let id_user = req.params.id
    let data = {
        ...req.body,
        password: md5(req.body.password)
    }
    let oldFileName
    await User.findOne({
        where: {id_user},
        attributes: ['foto']
    })
    .then(result => {
        if (!result) {
            return res.json({
                message: 'Data tidak ditemukan'
            })
        }
        oldFileName = result.foto
    })
    .catch(err => res.json({
        message: err.message
    }))
    if (req.file) {
        let location = path.join(__dirname, '../../public/img', oldFileName)
        fs.unlink(location, err => console.log(err))
        data.foto = req.file.filename
    } else {
        data.foto = oldFileName
    }
    await User.update(data, {
        where: {id_user}
    })
    .then(() => res.json({
        message: `Berhasil mengubah user dengan id ${id_user}`
    }))
    .catch(err => res.json({
        message: err.message
    }))

}

exports.delete = async (req, res) => {
    let id_user = req.params.id
    await User.findOne({
        where : {id_user},
        attributes: ['foto']
    })
    .then(result => {
        if (!result) {
            return res.json({
                message: 'Data tidak ditemukan'
            })
        }
        let oldFileName = result.foto
        let location = path.join(__dirname, '../../public/img', oldFileName)
        fs.unlink(location, error => console.log(error))
    })
    .catch(err => res.json({
        message: err.message
    }))
    await User.destroy({
        where: {id_user}
    })
    .then(() => res.json({
        message: `Berhasil menghapus user dengan id ${id_user}`
    }))
    .catch(err => res.json({
        message: err.message
    }))
}
