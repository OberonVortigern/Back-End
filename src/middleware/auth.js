const jwt = require('jsonwebtoken')

const SCREAT_KEY = 'Wikusama'

exports.authorization = (req, res, next) => {
    let header = req.headers.authorization
    let token = header && header.split(" ")[1]

    if (token === null) {
        return res.json({
            message: 'Unauthorized'
        })
    }

    jwt.verify(token, SCREAT_KEY, (err, _data) => {
        if (err) {
            return res.json({
                message: 'Token tidak valid'
            })
        }

        next()
    })
}