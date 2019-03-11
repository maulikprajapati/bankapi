import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env file, where API keys and passwords are configured

export class EnvLoader {
  static load() {
    console.info('current environment : ' + process.env.NODE_ENV);
    let environment = process.env.NODE_ENV || 'development';
    environment = environment
      .trim()
      .replace('`', '')
      .replace('`', '');

    process.env.NODE_ENV = environment;
    console.info('updated environment : ' + environment);

    const envPath = path.join(__dirname, `../environments/.${environment}.env`);
    if (!fs.existsSync(envPath)) {
      throw { error: 'error while loading environment settings.' };
    }

    const result = dotenv.config({
      path: envPath
    });
  }
}
