import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

const router = express.Router();

// Get users api
router.get('/getUsers', (request, response) => {
    console.log("logged from server", request.body);
    const userObj = {
        name: "raju",
        location: 'paknajol'
    }
    return response.send({ valid: true, message: 'The user sent from backend server', userObj });
});

// User login
router.post("/login", async (request, response) => {
    console.log("logged from user routes", request.body);
    try {
        const { email, password } = request.body;
        console.log("inside api");

        // Check if the user exists
        const user = await User.findOne({ email });
        console.log("after checking", user);

        if (!user) {
            return response.send({ valid: false, message: "Invalid email or password" });
        }
        console.log("username match check");

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("pass incorrect");
            return response.send({ valid: false, message: "Invalid email or password" });
        }

        console.log("valid password");
        return response.send({ valid: true, message: "Login successful", user });
    } catch (error) {
        return response.send({ valid: false, message: "Error logging in" });
    }
});

// User signup
router.post("/signup", async (request, response) => {
    console.log("logged from user routes");
    try {
        const { username, email, password } = request.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.send({ valid: false, message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user in the database
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return response.send({ valid: true, message: "User registered successfully" });
    } catch (error) {
        return response.send({ valid: false, message: "Error signing up" });
    }
});

export default router;
