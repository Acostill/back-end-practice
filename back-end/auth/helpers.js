/**This file is for HELPER functions. These helper functions help set up Password Hashing AND logging in feature */

const bcrypt = require('bcryptjs');
const pgp = require('pg-promise')({});
const db = pgp('postrgres://localhost/practice');

comparePassword = (userPassword, dbPassword) => {
    return bcrypt.compareSync(userPassword, dbPassword)
}

createHash = password => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

loginRequired = (req, res, next) => {
  if(!req.username){
      return res.status(401).json({
          status: 'Please log in'
      })
      return next()
  }
}
module.exports ={
    comparePassword: comparePassword,
    createHash: createHash,
    loginRequired: loginRequired,
}