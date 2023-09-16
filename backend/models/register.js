const mongoose = require('mongoose');


const registerSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    }

})

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
