const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const api = require("./routes/api");
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

app.use("/api", api);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
	console.log("Invalid url " + req.url);
	res.sendFile(path.join(__dirname+"/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);