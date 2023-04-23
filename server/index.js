const express = require("express");
require("dotenv").config();
const app = express();
const routes = require("./routes");
const sequelize = require("./db");
const cors = require("cors");
const fileMiddleware = require("./middleware/fileMiddleware")
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/errorMiddleware");
app.use(cookieParser());


app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,

  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileMiddleware.array("file"))
app.use("/api", routes);
app.use(errorMiddleware);
const PORT = process.env.PORT ?? 8080;
async function start() {
  try {
    app.listen(PORT, async () => {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
} { }
start();
