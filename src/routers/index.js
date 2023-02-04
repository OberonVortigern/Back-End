const router = [
    {
        prefix: '/user',
        route: require('./user')
    },
    {
        prefix: '/kamar',
        route: require('./kamar')
    },
    {
        prefix: '/tipe',
        route: require('./tipe_kamar')
    }
]

module.exports = router