const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const port = 3000;
const cors = require('cors');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });


app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// add a new application
app.post("/application", upload.fields([{ name: 'resume' }, { name: 'jobDescription' }]), async (req, res) => {
  const { name } = req.body;
  const resume = req.files.resume ? req.files.resume[0].path : null;
  const jobDescription = req.files.jobDescription ? req.files.jobDescription[0].path : null;

  try {
    const newApplication = await prisma.application.create({
      data: {
        title: name,
        resume: resume,
        jobDescription: jobDescription,
        status: 0,
        date: new Date(),
      },
    });

    const application = {
      date: newApplication.date,
      name: newApplication.title,
      resumeLink: newApplication.resume,
      jobDescription: newApplication.jobDescription,
      status: newApplication.status,
    };
  
    res.json(application);

  } catch (error) {
    res.status(500).json({ error: 'There was an error creating the application' });
  }
  
});

// get all applications
app.get("/application", async (req, res) => {

  const applications = await prisma.application.findMany().then((applications) => {
    return applications.map((application) => {
      return {
        date: application.date,
        name: application.title,
        resumeLink: application.resume,
        jobDescription: application.jobDescription,
        status: application.status,
      };
    });
  });
  res.send(applications);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});