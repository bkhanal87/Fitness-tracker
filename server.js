const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

 mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dry-headland-39755', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false

  });

app.use(require("./routes/htmlRoutes"));
app.use(require("./routes/apiRoutes"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});