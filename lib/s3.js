const S3 = require('aws-sdk/clients/s3');

module.exports = new S3({
  regions: 'eu-west-1',
  params: { Bucket: process.env.AWS_BUCKET_NAME }, // CHANGE THIS GUYS WHEN YOU CREATE A NEW BRANCH
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});
