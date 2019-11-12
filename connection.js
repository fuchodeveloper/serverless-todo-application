const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://docker.for.mac.localhost:8000"
});

module.exports = { AWS };
