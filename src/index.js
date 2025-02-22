require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const route = require("./routes");
const app = express();
const db = require("./config/db");
const cors = require("cors");
const CONFIG = require("./config/env");
app.use(cors());
app.use(express.json());
db.connect();
app.use(morgan("combined"));
route(app);

app.listen(CONFIG.PORT, () => {
  console.log(`Example app listening on port ${CONFIG.PORT}`);
});
