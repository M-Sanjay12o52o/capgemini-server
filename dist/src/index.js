import express from "express";
import cors from "cors";
import { createUser, saveUserToDatabase } from "../helper.js";
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Handle POST request for saving user data
app.post("/users", async (req, res) => {
    const { firstName, lastName, jobTitle, number, email, avatar, company } = req.body;
    try {
        // Construct an object to match the ContactUser interface
        const user = {
            firstName,
            lastName,
            email,
            jobTitle,
            number,
            company,
            avatar,
        };
        await saveUserToDatabase(user); // Pass the user object
        res.status(201).json({ message: "User data saved successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to save user data." });
    }
});
// Handle POST request for create user
app.post("/users/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        // Construct an object to match the ContactUser interface
        const user = {
            firstName,
            lastName,
            email,
            password,
        };
        await createUser(user); // Pass the user object
        res.status(201).json({ message: "User created successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user." });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map