const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const errorHandling = require("./middlewares/errorHandling");

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.text());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errorHandling);

app.get("/", (req, res) => {
  res.status(200).json({ message: "ok", data: "Server is ready!" });
});

app.listen(port, () => {
  console.log(`Server listening on http://47.128.145.189:${port}...`);
});
