const pgp = require('pg-promise')({});
const db = pgp('postrgres://localhost/practice');
const authHelpers = require('../auth/helpers');

/**FIRST WE USED THIS FUNCTION: newUser. THIS FUNCTION DID NOT OFFER USER AUTH(VERRRRYYYYY IMPORTANT TO HAVE USER AUTH WHEN INTERACTING WITH YOUR DB. IF NOT, THE GHOULIES AND BOOGIEMAN COMES AND GETS YOU). WE STORED password_digest AS PLAIN TEXT!! OMG THAT LAST SENTENCE GAVE ME THE SHUDDERS!! HERE IT WAS... */

//  newUser = (req, res, next) => {
//     db.none('INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4);', [req.body.username,
//         req.body.firstname,
//         req.body.lastname,
//         req.body.password_digest
//     ])
//     .then(() => {
//         res.status(200)
//             .json({
//                 message: 'inserted one user'
//             })
//     })
//     .catch(function(err){
//         console.log("backend error", err)
//         return next(err)
//     });
// }
/**THE NEW AND IMPROVED AND SAFER WAY TO MAKE A USER... HERE IT IS */
 registerUser = (req, res, next) => {
    let hash = authHelpers.createHash(req.body.password)
    db.none('INSERT INTO users (username, firstname, lastname, password_digest) VALUES ($1, $2, $3, $4)',
        [req.body.username, req.body.firstname, req.body.lastname, hash])
        .then(() => {
            res.status(200).json({
                message: 'Registration successful'
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'Error',
                error: err
            })
        })
}
/**LOGOUT IS SUPPLIED THROUGH A SIMPLE req.logout() GIVEN TO US THROUGH passport.js *dont quote me* */
logoutUser = (req,res,next) => {
    req.logout()
    res.status(200).json({
        status: 'success',
        message: 'user logged out.'
    })
}
/**THIS FUNCTION IDK...EDITS A USER?! LOL HEY BUT REMEMBER WE NEED A *HASHED* PASSWORD. SO WE JUST USE THAT HASH FUNCTION AGAIN. NO BIGGIE. */
editUser = (req,res,next) => {
    let hash = authHelpers.createHash(req.body.password)
    db.none('UPDATE users SET username = $1, firstname = $2, lastname = $3, password_digest = $4 WHERE user_id = $5',
[req.body.username,
req.body.firstname,
req.body.lastname,
hash,
req.params.id])
    .then(data => {
        res.status(200)
            .json({
                status: 'success',
                message: 'changed the user.'
            })
    })
    .catch(err=>{
        console.log(`backend err ${err}`)
        return next(err)
    })
}

//export everything here
module.exports = {
registerUser: registerUser,
logoutUser: logoutUser,
// newUser: newUser,
editUser: editUser,
}