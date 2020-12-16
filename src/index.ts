import App from './app/App';
import ConfigurationManager from './infra/configurations/ConfigurationManager';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.ENVFILE});

const configuration = new ConfigurationManager();
const app = new App(configuration);

app
  .start()
  .then((resp) => {
    console.log(resp);
  })
  .catch((error) => {
    console.log(error);
  });
