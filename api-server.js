import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4000;
const host = process.env.HOST || "127.0.0.1";

app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGODB_URI;
if (!mongoUrl) {
  console.error("Missing MONGODB_URI environment variable");
  process.exit(1);
}

await mongoose.connect(mongoUrl, {
  dbName: process.env.MONGODB_DB ?? undefined,
});

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  logo: String,
  location: String,
  type: String,
  salary: String,
  tags: [String],
  posted: String,
  applicants: Number,
  description: String,
});

const applicationSchema = new mongoose.Schema({
  jobId: String,
  status: String,
  applied: String,
});

const recruiterPostingSchema = new mongoose.Schema({
  title: String,
  applicants: Number,
  views: Number,
  status: String,
});

const JobModel = mongoose.model("Job", jobSchema);
const ApplicationModel = mongoose.model("Application", applicationSchema);
const RecruiterPostingModel = mongoose.model("RecruiterPosting", recruiterPostingSchema);

app.get("/api/jobs", async (req, res) => {
  const jobs = await JobModel.find().lean();
  res.json(jobs);
});

app.post("/api/jobs", async (req, res) => {
  const job = await JobModel.create(req.body);
  res.status(201).json(job);
});

app.get("/api/jobs/:id", async (req, res) => {
  const job = await JobModel.findById(req.params.id).lean();
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
});

app.get("/api/applications", async (req, res) => {
  const applications = await ApplicationModel.find().lean();
  res.json(applications);
});

app.post("/api/applications", async (req, res) => {
  const application = await ApplicationModel.create(req.body);
  res.status(201).json(application);
});

app.get("/api/recruiter-postings", async (req, res) => {
  const postings = await RecruiterPostingModel.find().lean();
  res.json(postings);
});

app.post("/api/recruiter-postings", async (req, res) => {
  const posting = await RecruiterPostingModel.create(req.body);
  res.status(201).json(posting);
});

const distPath = path.join(__dirname, "dist");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ message: "Not found" });
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
