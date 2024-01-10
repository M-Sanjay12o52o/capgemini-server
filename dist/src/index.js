import express from "express";
import cors from "cors";
import { createJob, createUser, getJobs, loginAdmin, loginUser, saveUserToDatabase, } from "../helper.js";
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
// Handle POST request for logging in user
app.post("/users/login", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        // Construct an object to match the ContactUser interface
        const user = {
            firstName,
            lastName,
            email,
            password,
        };
        await loginUser(user); // Pass the user object
        res.status(201).json({ message: "user logged in successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user." });
    }
});
// Handle POST request for logging in user
app.post("/admin/login", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        // Construct an object to match the ContactUser interface
        const user = {
            fullName,
            email,
            password,
        };
        await loginAdmin(user); // Pass the user object
        res.status(201).json({ message: "user logged in successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user." });
    }
});
// Handle POST request for creating job posting
app.post("/admin/createjob", async (req, res) => {
    const { title, description, company, location, requirements, responsibilities, createdAt, updatedAt, isPublished, } = req.body;
    try {
        // Construct an object to match the JobInterface
        const job = {
            title,
            description,
            company,
            location,
            requirements,
            responsibilities,
            createdAt,
            updatedAt,
            isPublished,
        };
        const createdJob = await createJob(job); // Pass the job object
        res
            .status(201)
            .json({ message: "Job created successfully.", job: createdJob });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create job." });
    }
});
// Handle GET request to retrieve all jobs
app.get("/jobs", async (req, res) => {
    try {
        // Call the function to get all jobs
        const allJobs = await getJobs();
        res.status(200).json(allJobs);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve jobs." });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map