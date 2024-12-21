const express = require("express");

const path = require("path");

const helmet = require("helmet");

//EXPRESS
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Securing app with helmet, recommended practice by Express
app.use(helmet());

//CSS paths
app.use("/css", express.static(__dirname + "/public/css"));

//JS paths
app.use("/js", express.static(__dirname + "/public/js"));

//IMG paths
app.use("/img", express.static(__dirname + "/public/img"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//ENDPOINTS
app.use("/", require("./routes/router")());

app.listen(process.env.PORT, () => {
	console.log(
		"################################################################################\n################################################################################"
	);
	console.log(
		"## Express is running on port " +
			process.env.PORT +
			" at " +
			Date() +
			" ##"
	);
	console.log(
		"################################################################################\n################################################################################"
	);
});

module.exports = app;
