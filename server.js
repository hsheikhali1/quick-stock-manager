const path = require("path");
const { db, sequelize } = require("./models");
const express = require("express");
const session = require("express-session");
const { create } = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3005;

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 3000000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const hbs = create();

app.use(session(sess));

// Register `hbs.engine` with the Express app.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// homepage
app.get("/", (_, res) => {
  res.render("home");
});

// about page
app.get("/about", (_, res) => {
  res.render("about");
});

// routes
app.use(require("./routes/user.routes"));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and resync db");
  app.listen(PORT, () => {
    console.log("Listening to server");
  });
});
