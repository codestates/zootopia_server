const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3-transform');
const path = require('path');
const { nanoid } = require('nanoid');
const sharpUtility = require('./sharp');
const fileFilter = require('../utilities/multer-filefilter');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'codestates-project-zootopia',
    cacheControl: 'max-age=600000',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    transforms: [
      {
        id: 'original',
        key(req, file, callback) {
          callback(
            null,
            `original/original_${Date.now()}${nanoid(4)}${path.extname(
              file.originalname,
            )}`,
          );
        },
        transform: function (req, file, callback) {
          callback(null, sharpUtility.original());
        },
      },
      {
        id: 'thumbnail',
        key(req, file, callback) {
          callback(
            null,
            `thumbnail/thumbnail_${Date.now()}${nanoid(4)}${path.extname(
              file.originalname,
            )}`,
          );
        },
        transform: function (req, file, callback) {
          callback(null, sharpUtility.thumbnail());
        },
      },
    ],
  }),
  limits: { fileSize: 10 * 1024 * 1024, parts: 10 },
  fileFilter,
});

module.exports = upload;
