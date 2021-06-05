const application = require('./dist');

module.exports = application;
const config = require('./config');
if (require.main === module) {
  // Run the application
  application.main(config).catch((err) => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
