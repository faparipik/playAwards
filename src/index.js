import app from './app.js';
import env from './config/config.js';
import logger from './config/logger.js';
import db from './config/db.js';

app.listen(env.port, () => {
  db.run(
    'CREATE TABLE IF NOT EXISTS user (id varchar(36), name varchar(500), email STRING, password STRING)',
  );
  db.run(
    'CREATE TABLE IF NOT EXISTS token (id varchar(500), user_id varchar(36), expires DATE, type varchar(200))',
  );

  logger.info(`App is running on PORT: ${env.port}`);
});
