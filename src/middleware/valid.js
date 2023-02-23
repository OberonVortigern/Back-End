const { check } = require('express-validator')

exports.validate = [
    check('nama_user').notEmpty().withMessage('Username tidak boleh kosong'),
    check('email').isEmail().withMessage('Format email salah'),
    check('password').notEmpty().withMessage('Password tidak boleh kosong').isLength({ min: 8 }).withMessage('Password minimal 8 karakter')
]