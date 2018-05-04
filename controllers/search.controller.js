const axios = require('axios')

module.exports = {
    searchEvent: function (req, res) {
        let key = process.env.EVENT_BRITTER_KEY
        let latitude = req.latitude
        let longitude = req.longitude
        let uri = `https://www.eventbriteapi.com/v3/events/search/?token=${key}&location.latitude=${latitude}&location.longitude=${longitude}`
        console.log(uri);
                
        axios.get(uri)
        .then(response => {
            console.log(response.data)
            res.status(200).json({
                message: 'success get event',
                latitude: req.latitude,
                longitude: req.longitude,
                events: response.data
            })         
        })  
        .catch(err => {
            console.log(err);
            
            res.status(400).json({
                message: 'Error on request',
                error: err
            })
        })
    }
}

// axios.get('https://www.eventbriteapi.com/v3/events/search/?token=XKHNIZIRNCOG7PKBABRZ&location.latitude=-6.17511&location.longitude=106.86503949999997')
//         .then(response => {
//             res.json(response.data)
//         })  
//         .catch(err => {
//             alert(err)
//         })