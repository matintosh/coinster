const path = require('path');
const gateway = require('express-gateway');

console.log("Running coinster gateway")
gateway()
  .load(path.join(__dirname, 'config'))
  .run();
