import { EnvLoader } from './modules/shared/config/envLoader';
EnvLoader.load();
import "babel-polyfill";
import app from './app';
import http from 'http';

http.createServer(app).listen(app.get('port'));
console.info(
  `app is running on http with port : ${app.get('port')}`
);

