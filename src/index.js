import app from './app.js';
import env from './config/config.js';
import logger from './config/logger.js';
import db from './config/db.js';

app.listen(env.port, () => {
  db.run(
    'CREATE TABLE IF NOT EXISTS user (id varchar(36), name varchar(500), email STRING, password STRING)',
  );
  logger.info(`App is running on PORT: ${env.port}`);
});
