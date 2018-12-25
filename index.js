var express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();
// to register hbs partials
hbs.registerPartials(__dirname + "/views/partials");
// to register helpers
hbs.registerHelper("currentYear", new Date().getFullYear());
//to set view engine
app.set("view engine", "hbs");
//to use static files like css/images
app.use(express.static(__dirname + "/public"));
// to register middleware eg. this is used to log the requests and time
app.use((req, res, next) => {
  var data = `${new Date().toString()}- ${req.method} - ${req.url}`;
  fs.appendFileSync("log.log", data + "\n");
  //   console.log(``);
  next();
});

app.get("/", function(req, res) {
  res.send("this is test app");
});

app.get("/about", function(req, res) {
  // res.send("this is test app");
  res.render("about.hbs", {
    title: "about us page",
    content: "this is the content of about us page"
    // currentYear: new Date().getFullYear()
  });
});

app.get("/contact", function(req, res) {
  // res.send("this is test app");
  res.render("contact.hbs", {
    title: "contact us page",
    content: "this is the content of about us page"
  });
});

app.get("/feedback", function(req, res) {
  // res.send("this is test app");
  res.render("feedback.hbs", {
    title: "feedback us page",
    content: "this is the content of feedback page"
  });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
