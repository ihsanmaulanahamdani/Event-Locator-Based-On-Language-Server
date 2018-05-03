const mongoose = require('mongoose')
const User     = require('../models/user')
const FB       = require('fb')
const jwt      = require('jsonwebtoken')

module.exports = {
  loginFb: (req, res) => {
    FB.api('me', { fields: ['id', 'name', 'email'], access_token: req.headers.fbtoken }, function (response) {
      User
        .findOne({
          email: response.email
        })
        .exec()
        .then(user => {
          if (user) {
            let token = jwt.sign({ name: user.name, email: user.email }, 'secretrahasia')

            res
              .status(200)
              .json({
                message: 'success login',
                token
              })
          } else {
            let user = new User({
              name: response.name,
              email: response.email
            })

            user
              .save()
              .then(newUser => {
                let token = jwt.sign({ name: newUser.name, email: newUser.email }, 'secretrahasia')

                res
                  .status(200)
                  .json({
                    message: 'success login',
                    token
                  })
              })
              .catch(err => {
                res
                  .status(500)
                  .json({
                    message: 'something went wrong',
                    err
                  })
              })
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({
              message: 'something went wrong',
              err
            })
        })
  })
  }
}