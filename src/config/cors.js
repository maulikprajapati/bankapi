
const whitelist = ['http://localhost:4200', 'https://onlinebankapp.herokuapp.com', process.env.SITE_URL];
export const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1 || (!req.header('Origin') && process.env.NODE_ENV !== 'production')) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};