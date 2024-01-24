const path = require("path");
const { db, sequelize } = require("./models");
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
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

app.use(session(sess));

const hbs = handlebars.create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));

// routes
app.use(require("./routes/user.routes"));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and resync db");
  app.listen(PORT, () => {
    console.log("Listening to server");
  });
});
