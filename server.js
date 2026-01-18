const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // Statik dosyaları sun (index.html, map.html vb.)

// Veritabanı Bağlantısı ve Kurulumu
// Not: Şema çakışmalarını önlemek için yeni bir dosya ismi kullanıyoruz
const db = new sqlite3.Database('./global_emlak_v1.db', (err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err.message);
    } else {
        console.log('SQLite veritabanına bağlandı (v2).');
        initDb();
    }
});

function initDb() {
    const setupSqlPath = path.join(__dirname, 'setup.sql');
    if (fs.existsSync(setupSqlPath)) {
        const sql = fs.readFileSync(setupSqlPath, 'utf8');
        db.exec(sql, (err) => {
            if (err) {
                console.error("Tablo oluşturma hatası:", err.message);
            } else {
                console.log("Veritabanı tabloları ve örnek veriler hazır.");
            }
        });
    }
}

// API Endpoints

// Giriş Kontrol (Mevcut fonksiyonu API'ye çevirelim)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.get(query, [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            res.json({ success: true, user: { name: row.full_name, role: row.role } });
        } else {
            res.status(401).json({ success: false, message: 'Hatalı e-posta veya şifre' });
        }
    });
});

// Parsel Sorgu Endpoint
app.get('/api/parcel', (req, res) => {
    const { city, district, neighborhood, block, parcel } = req.query;

    // Basit bir sorgu - Gerçek senaryoda tüm kriterleri filtrelemek gerekir
    // Şimdilik sadece Ada (block) ve Parsel (parcel) üzerinden arayalım
    // TKGM mantığı: İl/İlçe/Mahalle/Ada/Parsel hiyerarşisi vardır.

    let query = `SELECT * FROM parcels WHERE city = ? AND district = ? AND neighborhood = ? AND block = ? AND parcel = ?`;
    let params = [city, district, neighborhood, block, parcel];

    db.get(query, params, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            // content JSON string olarak saklanıyor, parse edip dönelim
            try {
                row.coordinates = JSON.parse(row.coordinates);
            } catch (e) {
                console.error("JSON parse hatası:", e);
            }
            res.json({ success: true, data: row });
        } else {
            res.status(404).json({ success: false, message: 'Parsel bulunamadı.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${port}`);
    console.log(`Harita: http://localhost:${port}/map.html`);
});
