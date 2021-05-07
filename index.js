'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/vuetify-notice.esm-bundler.prod.js');
} else {
  module.exports = require('./lib/vuetify-notice.esm-bundler.js');
}
