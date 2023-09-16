const express = require('express');
const router = express.Router();
const Register = require('../models/register');
const Contact = require('../models/contact');


router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ error: "please fill all the fields" });
    }

    try {

        const userexist = await Register.findOne({ email: email, password: password });

        if (userexist) {
            return res.status(422).json({ error: "user already exists" });
        } else {
            const user = new Register({ name, email, password });

            const saveuser = await user.save();

            if (saveuser) {
                return res.status(201).json({ message: "user registered successfully" });
            } else {
                return res.status(500).json({ error: "user registration failed" });
            }
        }


    } catch (error) {
        console.log("error", error);
    }

})


router.post("/contact", async (req, res) => {

    const { name, email, contact, message } = req.body;

    if (!name || !email || !contact || !message) {
        return res.status(422).json({ error: "please fill all the fields properly" });
    }

    try {

        const detail = new Contact({ name, email, contact, message });

        const detailssaved = await detail.save();

        if (detailssaved) {
            return res.status(201).json({ message: "your contact details received successfully" });
        } else {
            return res.status(500).json({ error: "error occurs please try again later" });
        }

    } catch (error) {
        console.log(error);
    }

})


module.exports = router;
