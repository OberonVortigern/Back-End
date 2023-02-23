const morgan = require('morgan')

const express = require('express')
const cors = require('cors')

const router = require('./routers/index')

const app = express()
const port = 8000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

router.forEach(router => app.use(router.prefix, router.route))
app.use((_req, res) => res.status(202).json({msg: "Page Not Found"}))

app.listen(port, () => console.log(`App listening in http://localhost:${port}`))