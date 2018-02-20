/**THIS USES THE PASSPORT MIDDLEWARE TO MAKE A SESSION CHECK OUT THIS LINK: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize */

const passport = require('passport')
const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost/practice') 

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser((username, done) => {
        db.one('SELECT username, password_digest FROM users WHERE username=$1', [username])
            .then((user) => {
                return done(null, user)
            })
            .catch((err) => {
                return done(err, null)
            })
    })
}