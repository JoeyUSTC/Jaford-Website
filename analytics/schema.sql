-- IP-level records are private and expire after 30 days; the total is aggregate.
CREATE TABLE IF NOT EXISTS visits (
  event_id TEXT PRIMARY KEY,
  occurred_at INTEGER NOT NULL,
  ip TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  latitude REAL,
  longitude REAL,
  asn INTEGER,
  network TEXT NOT NULL DEFAULT '',
  institution TEXT
);
CREATE INDEX IF NOT EXISTS visits_time ON visits(occurred_at);
CREATE TABLE IF NOT EXISTS totals (id INTEGER PRIMARY KEY CHECK(id = 1), views INTEGER NOT NULL DEFAULT 0);
INSERT OR IGNORE INTO totals(id, views) VALUES (1, 0);
CREATE TRIGGER IF NOT EXISTS count_accepted_visit AFTER INSERT ON visits
BEGIN UPDATE totals SET views = views + 1 WHERE id = 1; END;
