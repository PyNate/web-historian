var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err,data){

    var sites = data.toString().split('\n');
    callback(sites);

    if(err){
      throw err;
    }

  });
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(sites){
    cb(sites.indexOf(url) > -1 );
  });
};

exports.addUrlToList = function(url){
  exports.readListOfUrls(function(sites){
    if(sites.indexOf(url) < 0){
      sites.pop();
      sites.push(url);
      var data = sites.join('\n');
      fs.writeFile(exports.paths.list, data, function(err){});
    }
  })
};

exports.isUrlArchived = function(url, cb){
  fs.exists(exports.paths.archivedSites + '/' + url, cb)
};

exports.downloadUrls = function(sites){
  for(var i = 0; i < sites.length; i++){
    console.log("Site: http://" + sites[i]);
    request('http://' + sites[i])
      .pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + sites[i]))
  }
};

