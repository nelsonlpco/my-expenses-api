import App from './app/App';
import ConfigurationManager from './infra/configurations/ConfigurationManager';

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
