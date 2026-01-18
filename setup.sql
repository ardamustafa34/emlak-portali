-- Tabloları Temizle (Yeniden Temiz Kurulum İçin)
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS parcels;

-- Kullanıcılar Tablosu
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'user'
);

-- Parseller Tablosu
CREATE TABLE IF NOT EXISTS parcels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT,
    district TEXT,
    neighborhood TEXT,
    block TEXT, -- Ada
    parcel TEXT, -- Parsel
    coordinates TEXT -- JSON String: [[lat, lng], [lat, lng], ...]
);

-- Örnek Veri (Kullanıcı)
INSERT OR IGNORE INTO users (email, password, full_name, role) 
VALUES ('demo@globalemlak.com.tr', '123', 'Test Kullanıcı', 'admin');

INSERT OR IGNORE INTO users (email, password, full_name, role) 
VALUES ('arda77281@gmail.com', '123', 'Arda', 'user');

INSERT OR IGNORE INTO users (email, password, full_name, role) 
VALUES ('zeydan@gmail.com', '123', 'Mehmet', 'user');


-- Örnek Veri (İstanbul Parselleri)
-- Koordinatlar İstanbul'daki ilgili bölgeleri temsil eden gerçekçi taslaklardır.

-- Parsel 1705/17 (Çatalca Bölgesi - Örnek)
INSERT OR IGNORE INTO parcels (city, district, neighborhood, block, parcel, coordinates)
VALUES (
    'İstanbul', 'Çatalca', 'Ferhatpaşa', '1705', '17', 
    '[[41.1445, 28.4550], [41.1450, 28.4550], [41.1450, 28.4560], [41.1445, 28.4560], [41.1445, 28.4550]]'
);

-- Parsel 1705/12 (Çatalca Bölgesi - Örnek)
INSERT OR IGNORE INTO parcels (city, district, neighborhood, block, parcel, coordinates)
VALUES (
    'İstanbul', 'Çatalca', 'Ferhatpaşa', '1705', '12', 
    '[[41.1435, 28.4540], [41.1440, 28.4540], [41.1440, 28.4550], [41.1435, 28.4550], [41.1435, 28.4540]]'
);
-- Parsel 191/24 (Çekmeköy Bölgesi)
INSERT OR IGNORE INTO parcels (city, district, neighborhood, block, parcel, coordinates)
VALUES (
    'İstanbul', 'Çekmeköy', 'Mehmet Akif', '191', '24', 
    '[[41.0205, 29.1915], [41.0215, 29.1915], [41.0215, 29.1925], [41.0205, 29.1925], [41.0205, 29.1915]]'
);