var axios= require ('axios')
var DetectLanguage = require('detectlanguage');

var detectLanguage = new DetectLanguage({
    key: process.env.DETECT_LANGUAGE_KEY,
    ssl: true
}); 
var CountryLanguage = require('country-language');

module.exports={
    getFullLanguage: function(req,res,next){
        let words = req.params.words.replace(/%20/gi, ' ');
        
        detectLanguage.detect(words, function(error, result) {
            var codelang = result[0].language
            CountryLanguage.getLanguageCountries(codelang, function (err, countries) {
                if (err) {
                  console.log(err);
                } else {                    
                //   countries.forEach(function (countryCodes) {
                    var countryCode = countries[0].code_2
                    axios.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
                        .then(function (response) {
                            // res.json(response.data.capital)
                            req.capital = response.data.capital
                            next()
                            // console.log(response.data)
                        })
                        .catch(function (error) {
                            res.status(400).json({
                                message: 'Error in request',
                                error: error
                            }) 
                        });
                    // console.log(countryCodes[0].code_2);
                //   });
                }
            });
 
        });
    }

}

