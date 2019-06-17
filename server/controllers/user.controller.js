const mongoose = require('mongoose');

const User = mongoose.model('User');
const Task = mongoose.model('Task');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret'




module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.login = (req,res,next) => {
    //console.log("c");
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    //console.log(user.email);
    User.findOne({
        email:req.body.email    
    })
    .then(user => {
            console.log("yes");
            if (user)
            {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        fullName: user.fullName,
                        
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                    console.log("right");
                    
                } 
                else {
                    res.json({ error: "Password Mismatch" })
                }
            } 
            else 
            {
                res.json({ error: "User does not exist" })
            }
        })
    .catch(err => {
        res.send('error: ' + err)
    })
}
