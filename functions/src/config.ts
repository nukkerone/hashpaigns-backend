const functions = require('firebase-functions')
const fs = require('fs')

let _config: any = functions.config().env;

if (_config.environment !== 'production') {
  if (fs.existsSync('./env.local.json')) {
    const env: any = require('./env.local.json')

    _config = env;
  }
}

export const config: any = _config;

