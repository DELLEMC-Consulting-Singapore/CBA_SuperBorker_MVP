const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");

var cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const transactions = require("./transactions.json");
function readData() {
  //   return fs.readFile("transactions.json", "utf8", function (err, data) {
  //     return data;
  //   });

  try {
    const data = fs.readFileSync("transactions.json", "utf8");
    return data;
  } catch (err) {
    return err;
  }
}
app.get("/api/transactions", async (req, res) => {
  res.send(transactions);
});

app.post("/", async (req, res) => {
  let d = await readData();
  console.log(d);
  let oldData = JSON.parse(d);
  let data = req.body;
  let parseData = JSON.parse(data["data"]);
  console.log(parseData[0]);
  parseData[0]["key"] = oldData.length + 1;
  oldData.push(parseData[0]);
  console.log(oldData);

  var writeStream = fs.createWriteStream("transactions.json");
  writeStream.write(JSON.stringify(oldData));
  writeStream.end();

  res.send({});
});

app.put("/", async (req, res) => {
  let d = await readData();
  let oldData = JSON.parse(d);
  //console.log(oldData);
  let data = req.body;
  //console.log(data);
  let parseData = JSON.parse(data["data"]);
  let newData = oldData.map((old) => {
    if (old["key"] == parseData["key"]) {
      return parseData;
    } else {
      return old;
    }
  });

  // console.log(parseData[0]);
  // parseData[0]["key"] = oldData.length + 1;
  // oldData.push(parseData[0]);
  // console.log(oldData);

  var writeStream = fs.createWriteStream("transactions.json");
  writeStream.write(JSON.stringify(newData));
  writeStream.end();

  res.send({});
});

app.listen(3002, () => {
  console.log("Example app listening on port 3002!");
});
