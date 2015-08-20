var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //need object with acceptable URLs
  if(req.url === '/'){
    if(req.method === "GET"){
      //Serve index.html
    }
    if(req.method === "POST"){
      //if data in request matches a site in the archive, serve the html file
      //if not, add it to the list and serve loading.html
    }
  }

  //if URL is /*websiteName* and method is GET
    //if website is in archive, serve the html file
    //else, send 404

  //else, send 404 or 405

  res.end(archive.paths.list);
};
