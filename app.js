const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 5000 || env.process.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files
app.use(express.static("public"));

// templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// routs
app.use("/", require("./server/routs/index"));

// 404 handler
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
