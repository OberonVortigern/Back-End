const jwt = require('jsonwebtoken')

const SCREAT_KEY = 'Wikusama'

const createToken = (data) => {
    let pyload = JSON.stringify(data)
    return jwt.sign(pyload, SCREAT_KEY)
}

module.exports = createToken