import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid password");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
