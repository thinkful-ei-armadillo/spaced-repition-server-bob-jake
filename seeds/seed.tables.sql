--psql -U dunder-mifflin -d spaced-repetition -f I:\thinkful\projects\spaced-repition-server-bob-jake\seeds\seed.tables.sql
BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Spanish', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'gracias', 'thank you', 2),
  (2, 1, 'bueno', 'good', 3),
  (3, 1, 'bruja', 'witch', 4),
  (4, 1, 'verde', 'green', 5),
  (5, 1, 'cerveza', 'beer', 6),
  (6, 1, 'dinero', 'money', 7),
  (7, 1, 'gato', 'cat', 8),
  (8, 1, 'perro', 'dog', 9),
  (9, 1, 'cuchillo', 'knife', 10),
  (10, 1, 'feo', 'ugly', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
