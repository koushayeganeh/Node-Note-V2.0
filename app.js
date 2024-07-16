require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./server/config/db");

const app = express();
const port = process.env.PORT || 5000;

// Passport Config
require("./server/config/passportConfig")(passport);

// DB Config and Connection
connectDB();

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride("_method"));

// Express session
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  collectionName: "sessions", // Specify collection name if needed
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 180 * 60 * 1000 }, // 3 hours
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static("public"));

// Templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/dashboard"));

// 404 handler
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
