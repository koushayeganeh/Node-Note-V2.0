require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files
app.use(express.static("public"));

// templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// routes
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/dashboard"));

// 404 handler
app.get("*", (req, res) => {
  res.status(404).render("404");
});

// database connection and app listening
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to database: ${err.message}`);
    process.exit(1);
  });
