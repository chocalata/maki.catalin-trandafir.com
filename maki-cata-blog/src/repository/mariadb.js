const mariadb = require("mariadb");
const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectionLimit: 5,
});

async function getEntries() {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query(
			"SELECT * FROM blog_entries ORDER BY date DESC"
		);

		return rows;
	} finally {
		if (conn) conn.release(); //release to pool
	}
}

async function insertEntry(queryData) {
	let conn;
	try {
		conn = await pool.getConnection();
		const result = await conn.query(
			"INSERT INTO blog_entries (title, description, image_name, date) VALUES (?, ?, ?, ?)",
			[
				queryData.title,
				queryData.description,
				queryData.image_name,
				queryData.date,
			]
		);
		return result;
	} finally {
		if (conn) conn.release();
	}
}

module.exports = { getEntries, insertEntry };
