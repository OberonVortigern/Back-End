const Pemesanan = require('../models/index').pemesanan
const DetailPemesanan = require('../models/index').detail_pemesanan
const Kamar = require('../models/index').kamar
const TipeKamar = require('../models/index').tipe_kamar
const User = require('../models/index').user

const Op = require('sequelize').Op

exports.findAll = async (req, res) => {
    let filter = {
        key: req.query.key,
        cek_in : req.query.cin,
        cek_out : req.query.cout
    }

    console.log(filter);

    if (filter.key && (filter.cek_in && filter.cek_out)) {
        await Pemesanan.findAll({
            include: [
                {
                    model: TipeKamar,
                    as: 'tipe_kamar'
                },
                {
                    model: User,
                    as: 'user'
                }
            ],
            where: {
                [Op.or]: {
                    nomor_pemesanan: {
                        [Op.like]: `%${filter.key}%`
                    },
                    nama_pemesan: {
                        [Op.like]: `%${filter.key}%`
                    },
                    email_pemesan: {
                        [Op.like]: `%${filter.key}%`
                    },
                    nama_tamu: {
                        [Op.like]: `%${filter.key}%`
                    }
                },
                tgl_check_in: {
                    [Op.between]: [
                        filter.cek_in,
                        filter.cek_out
                    ]
                }
            }
        }).then(
            result => res.json({
                message: `Berhasil mengambil data dengan filter ${filter.key}`,
                data: result
            })
        ).catch(
            err => res.json({
                message: err.message
            })
        )
    } else {
        await Pemesanan.findAll({
            include: [
                {
                    model: TipeKamar,
                    as: 'tipe_kamar'
                },
                {
                    model: User,
                    as: 'user'
                }
            ]
        }).then(
            result => res.json({
                message: 'Berhasil mengambil data pemesanan',
                data: result
            })
        ).catch(
            err => res.json({
                message: err.message
            })
        )
    }
}

exports.insert = async (req, res) => {
    let data = req.body

    let data_kamar = await Kamar.findAll({
        where: {
            id_tipe_kamar: data.id_tipe_kamar
        }
    })

    let data_tipe_kamar = await TipeKamar.findOne({
        where: {
            id_tipe_kamar: data.id_tipe_kamar
        }
    })

    let data_pemesanan = await TipeKamar.findAll({
        attributes: ['id_tipe_kamar, nama_tipe_kamar'],
        where: {
            id_tipe_kamar: data.id_tipe_kamar
        },
        include: [
            {
                model: Kamar,
                as: 'kamar',
                attributes: ['id_kamar', 'id_tipe_kamar'],
                include: [
                    {
                        model: DetailPemesanan,
                        as: 'detail_pemesanan',
                        attributes: ['tgl_akses'],
                        where: {
                            [Op.between]: [data.tgl_check_in, data.tgl_check_out]
                        }
                    }
                ]
            }
        ]
    })

    let id_kamar_terpesan = data_pemesanan[0].kamar.map(
        kamar => kamar.id_kamar
    )
    let kamar_available = data_kamar.filter(
        kamar => !id_kamar_terpesan.includes(kamar.id_kamar)
    )
    let kamar_terpilih = kamar_available.slice(0,data.jumlah_kamar)

    let cek_in = new Date(data.tgl_check_in)
    let cek_out = new Date(data.tgl_check_out)
    let total_hari = Math.round(
        (cek_out - cek_in) / (1000 * 60 * 60 *24)
    )

    if (
        data_kamar == null ||
        kamar_available.length < data.jumlah_kamar ||
        total_hari == 0 ||
        kamar_terpilih == null
    ) {
        return res.json({
            message: 'Kamar tidak tersedia!'
        })
    } else {
        await Pemesanan.create(data).then(
            async result => {
                for (let i = 0; i < total_hari; i++) {
                    for (let j = 0; j < kamar_terpilih.length; j++) {
                        let tgl_akses = new Date(cek_in)
                        tgl_akses.setDate(tgl_akses.getDate() + i)
                        let data_detail = {
                            id_pemesanan: result.id_pemesanan,
                            id_kamar: kamar_terpilih[j].id_kamar,
                            tgl_akses: tgl_akses,
                            harga: data_tipe_kamar.harga
                        }
                        await DetailPemesanan.create(data_detail)
                    }
                }
                return res.json({
                    message: 'Berhasil melakukan pemesanan'
                })
            }
        ).catch(
            err => res.json({
                message: err.message
            })
        )
    }
}

exports.delete = async (req, res) => {
    let id_pemesanan = req.params.id

    await Pemesanan.findOne({
        where: {id_pemesanan}
    }).then(
        async result => {
            if (result == null) {
                return res.json({
                    message: 'Data tidak ditemukan'
                })
            } else {
                await DetailPemesanan.destroy({
                    where: {id_pemesanan}
                })
                await Pemesanan.destroy({
                    where: {id_pemesanan}
                }).then(
                    () => res.json({
                        message: 'Berhasil menghapus data'
                    })
                ).catch(
                    err => res.json({
                        message: err.message
                    })
                )
            }
        }
    )
}