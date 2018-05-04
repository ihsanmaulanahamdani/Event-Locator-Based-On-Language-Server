const express = require('express')
const router = express().Router()
const axios = require('axios')


router.use(cors())

router.get('/', (req, res, next) => {
    axios.get('https://www.eventbriteapi.com/v3/events/search/?token=XKHNIZIRNCOG7PKBABRZ&location.latitude=-6.17511&location.longitude=106.86503949999997')
        .then(response => {
            res.json(response.data)
        })  
        .catch(err => {
            alert(err)
        })
})


module.exports = router