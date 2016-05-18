"use strict";

let fs      = require("fs")
,   path    = require("path")
,   AWS     = require("aws-sdk")
,   Promise = require("bluebird");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  endPoint: "s3.amazonaws.com"
});

let bucketName      = process.env.S3_BUCKET
,   imageFolderName = process.env.S3_IMAGE_FOLDER
,   s3 = new AWS.S3({
  apiVersion: "2006-03-01"
});

let S3Api = {
  
  /**
   * Uploads a image with given name to S3.
   * 
   * @param  {String} imageName the given image name.
   * @param  {Object} imageFile the image file.
   * 
   * @return {Promise} the new promise object.
   */
  uploadImage: function(imageName, imageFile) {
    
    return new Promise(function(resolve, reject) {
      
      let imagePath = imageFile.path;
      
      fs.readFile(imagePath, function(err, data) {
        
        if (err) {
          reject(err);
        } else {
          let imageUrl = imageFolderName + '/' + imageName;
          
          let params = {
            Bucket: bucketName,
            Key: imageUrl, 
            Body: data
          };
          
          s3.upload(params, function(err, data) {
            if (err) {
              reject(err);
            } else {
              // delete the tmp file when upload succeeded
              // use retry approach later
              fs.unlink(imagePath, function() {
                resolve(imageUrl);
              });
            }
          });
          
        }
        
      });
      
    });

  },
  
  /**
   * Removes a image with given url on S3.
   * 
   * @param  {String} imageUrl the given image url.
   * 
   * @return {Promise} the new promise object.
   */
  removeImage: function(imageUrl) {
    return new Promise(function(resolve, reject) {
      let params = {
        Bucket: bucketName,
        Key: imageUrl
      };
      
      s3.deleteObject(params, function(err, data) {
        if (err){
          reject(err);
        } else {
          resolve(data);
        }        
      });
    });
  }

};

module.exports = S3Api;