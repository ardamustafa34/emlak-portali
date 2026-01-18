const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./tarim_portali_v2.db');
const sql = fs.readFileSync('./setup.sql', 'utf8');

db.serialize(() => {
    db.exec(sql, (err) => {
        if (err) {
            console.error("SQL Error:", err.message);
        } else {
            console.log("Database initialized successfully.");
        }
        db.close();
    });
});
