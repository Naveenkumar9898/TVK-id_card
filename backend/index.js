const express = require("express");
const cors = require("cors");

const db = require("./config/database.js");
const Member = require("./models/member.js");

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.post("/member", async (req, res) => {
  try {
    const saved = await Member.create(req.body);

    return res.status(200).send({
      status: true,
      response: saved,
      message: "Saved successfully",
    });

  } catch (err) {
    return res.status(500).send({
      status: false,
      response: err.message,
      message: "Server error",
    });
  }
});



app.get("/members", async (req, res) => {
  try {
    const data = await Member.find();

    return res.status(200).send({
      status: true,
      response: data,
      message: "Data fetched successfully",
    });

  } catch (err) {
    return res.status(500).send({
      status: false,
      response: err.message,
      message: "Server error",
    });
  }
});



app.get("/member/:id", async (req, res) => {
  try {

    const data = await Member.findById(req.params.id);

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Member not found",
      });
    }

    return res.status(200).send({
      status: true,
      response: data,
      message: "Member fetched successfully",
    });

  } catch (err) {
    return res.status(500).send({
      status: false,
      response: err.message,
      message: "Server error",
    });
  }
});



app.put("/member/:id", async (req, res) => {
  try {

    const updated = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).send({
        status: false,
        message: "Member not found",
      });
    }

    return res.status(200).send({
      status: true,
      response: updated,
      message: "Updated successfully",
    });

  } catch (err) {
    return res.status(500).send({
      status: false,
      response: err.message,
      message: "Server error",
    });
  }
});



app.delete("/member/:id", async (req, res) => {
  try {

    const deleted = await Member.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).send({
        status: false,
        message: "Member not found",
      });
    }

    return res.status(200).send({
      status: true,
      response: deleted,
      message: "Deleted successfully",
    });

  } catch (err) {
    return res.status(500).send({
      status: false,
      response: err.message,
      message: "Server error",
    });
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});