const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./authRouter");
const PORT = process.env.PORT || 2121;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use(cors());

const start = () => {
  try {
    app.listen(PORT, async () => {
      await mongoose.connect(
        "mongodb+srv://alexsim:SmY0ZWpClGTWcu1B@cluster0.ozgvojw.mongodb.net/?retryWrites=true&w=majority"
      );

      console.log(`\nServer started on port ${PORT}\n`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
