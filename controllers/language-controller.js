var axios= require ('axios')

var DetectLanguage = require('detectlanguage');

var detectLanguage = new DetectLanguage({
    key: 'c694069d5bfe1dc38eae7b8d3a0e25a2',
    ssl: true
}); 

var CountryLanguage = require('country-language');


module.exports={
    getFullLanguage(req,res,next){
        detectLanguage.detect(req.params.words, function(error, result) {
            var codelang = result[0].language
            CountryLanguage.getLanguageCountries(codelang, function (err, countries) {
                if (err) {
                  console.log(err);
                } else {                    
                //   countries.forEach(function (countryCodes) {
                    var countryCode = countries[0].code_2
                    axios.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
                        .then(function (response) {
                            res.json(response.data.capital)
                            // console.log(response.data)
                        })
                        .catch(function (error) {
                            return error
                        });
                    // console.log(countryCodes[0].code_2);
                //   });
                }
            });
 
        });
    }

}

