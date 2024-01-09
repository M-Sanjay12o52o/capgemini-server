import express from "express";
import cors from "cors";
import { saveUserToDatabase } from "../helper.js";
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Handle POST request for saving user data
app.post("/users", async (req, res) => {
    const { firstName, lastName, jobTitle, number, email, avatar } = req.body;
    try {
        await saveUserToDatabase(firstName, lastName, email, jobTitle, number, avatar);
        res.status(201).json({ message: "User data saved successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to save user data." });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map