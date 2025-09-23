const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const Meet = require("./models/meet.models");

initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

async function createMeet(newMeet) {
  try {
    const meet = new Meet(newMeet);
    const savedMeet = await meet.save();
    return savedMeet;
  } catch (error) {
    console.log(error);
  }
}
app.post("/meets", async (req, res) => {
  try {
    const savedMeet = await createMeet(req.body);
    res
      .status(201)
      .json({ message: "Meet added successfully.", meet: savedMeet });
  } catch (error) {
    res.status(500).json({ error });
  }
});

async function readMeetByTitle(meetId) {
  try {
    const meet = await Meet.findById(meetId);
    return meet;
  } catch (error) {
    throw error;
  }
}
// readMeetByTitle("Lagaan");
app.get("/meets/:meetId", async (req, res) => {
  try {
    const meet = await readMeetByTitle(req.params.meetId);
    if (meet.length != 0) {
      res
        .status(200)
        .json({ message: "Meet data founded successfully.", meet });
    } else {
      res.status(404).json({ error: "Meet not Found." });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

async function readAllMeets() {
  try {
    const meet = await Meet.find();
    return meet;
  } catch (error) {
    throw error;
  }
}
app.get("/meets", async (req, res) => {
  try {
    const meet = await readAllMeets();
    if (meet.length != 0) {
      res
        .status(200)
        .json({ message: "Meet data founded successfully.", meet });
    } else {
      res.status(404).json({ error: "Meet not Found." });
      throw "Error in finding data";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

async function updateMeet(MeetId, dataToUpdate) {
  try {
    const updatedMeet = await Meet.findByIdAndUpdate(MeetId, dataToUpdate, {
      new: true,
    });
    return updatedMeet;
  } catch (error) {
    console.log("Error in updating Meet rating", error);
  }
}
app.post("/meets/:MeetId", async (req, res) => {
  try {
    const updatedMeet = await updateMeet(req.params.MeetId, req.body);
    if (updatedMeet) {
      res
        .status(200)
        .json({ message: "Meet updated successfully.", updatedMeet });
    } else {
      res.status(404).json({ error: "Meet doesn't exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to update Meet" });
  }
});

async function deleteMeet(MeetId) {
  try {
    const deletedMeet = await Meet.findByIdAndDelete(MeetId);
    return deletedMeet;
  } catch (error) {
    console.log(error);
  }
}
app.delete("/meets/:MeetId", async (req, res) => {
  try {
    const deletedMeet = await deleteMeet(req.params.MeetId);
    if (deletedMeet) {
      res
        .status(200)
        .json({ message: "Meet deleted successfully.", deletedMeet });
    } else {
      res.status(404).json({ error: "Meet not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Meet" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
