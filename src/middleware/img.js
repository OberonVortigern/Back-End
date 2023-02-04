const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (_req, _file, clbk) => {
        clbk(null, './public/img')
    },
    filename: (_req, file, clbk) => {
        clbk(null, `image-${Date.now()}${path.extname(file.originalname)}`)
    }
})

exports.upload = multer({storage})