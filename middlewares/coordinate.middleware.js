function getCoordinate (req, res, next) {
    let capital_name = req.capital
    let mapApiKey = process.env.GOOGLE_MAP_API_KEY

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${capital_name}&key=${mapApiKey}`)
    .then((response) => {
        req.latitude = response.results[0].geometry.location.lat
        req.longitude = response.results[0].geometry.location.lng
        next()
    })
    .catch((err) => {
        console.log(err)    
    })

}