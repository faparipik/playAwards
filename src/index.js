import app from './app.js';
import env from './config/config.js';

app.listen(env.port, () => {
  console.log(`App is running on PORT: ${env.port}`);
});
