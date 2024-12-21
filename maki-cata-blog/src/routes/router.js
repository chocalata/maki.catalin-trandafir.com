const router = require("express").Router();

const mariadbRepository = require("../repository/mariadb");

//Multer configuration
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");

//save on a temp folder
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "/tmp/");
	},
	filename: function (req, file, cb) {
		console.log(file);

		//transform filename to file format: 20241220_1.<extname>
		let fileDate = req.body.date.replace(/-/g, "");

		//check how many files are in the folder with the same name
		let files = fs.readdirSync(
			path.join(__dirname, "../public/img/blog-images")
		);

		let count = files.filter((f) => f.includes(fileDate)).length;

		const filename = fileDate + "_" + count;

		console.log(filename);

		cb(null, filename + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

const PUBLISH_PASSWORD = process.env.PUBLISH_PASSWORD;

//password check middleware
const passwordCheck = (req, res, next) => {
	console.log(req.body);
	console.log(req.body.password);
	console.log(PUBLISH_PASSWORD);
	if (req.body.password === PUBLISH_PASSWORD) {
		console.log("password correct");
		next();
	} else {
		console.log("password incorrect");
		//delete de file if is created
		fs.unlink(req.file.path, (err) => {
			if (err) {
				console.log(err);
			}
		});

		res.redirect("/");
	}
};

module.exports = function routes() {
	router.get("/", function (req, res) {
		mariadbRepository
			.getEntries()
			.then((rows) => {
				res.render("index", { entries: rows });
			})
			.catch((err) => {
				console.log(err);
			});
	});

	router.post(
		"/",
		upload.single("image"),
		passwordCheck,
		async function (req, res) {
			// check the password from the form
			console.log(req.file);
			console.log(req.body);

			if (/*req.body.password*/ "test" === PUBLISH_PASSWORD) {
				const queryData = {
					title: req.body.title,
					description: req.body.description,
					image_name: req.file.filename,
					date: req.body.date,
				};

				try {
					// Insert entry into the database
					await mariadbRepository.insertEntry(queryData);

					// Move the file after the database operation
					await sharp(req.file.path)
						.withMetadata()
						.toFile(
							path.join(
								__dirname,
								"../public/img/blog-images",
								req.file.filename
							)
						);

					// Successfully inserted and moved file
					res.redirect("/");
				} catch (err) {
					console.error(err);

					// Cleanup file in case of an error
					if (req.file && req.file.path) {
						fs.unlink(req.file.path, (unlinkErr) => {
							if (unlinkErr) {
								console.error(
									"Error removing file:",
									unlinkErr
								);
							}
						});
					}

					// Redirect on error
					res.redirect("/");
				}
			} else {
				res.redirect("/");
			}
		}
	);

	return router;
};
