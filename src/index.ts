import dotenv from 'dotenv';
import Startup from './app/Startup';

dotenv.config({ path: process.env.ENVFILE});

const bootstrap = new Startup();
bootstrap.run().then(() => {console.log('running')}).catch(error => {console.log('erro: ', error)});
