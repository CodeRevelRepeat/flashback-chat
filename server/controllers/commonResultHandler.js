
"use strict";

var Clarifai = require('./clarifai_node.js');
Clarifai.initAPI("gpo48HRcufNAVheWKv83YnYuOQ7-coCyo2k8ORx6", "f5QXPZIfTjNVyw7Sj9CcKTEBf-BAa2ZfDqeJe_fX");
var stdio = require('stdio');

var opts = stdio.getopt( {
  'print-results' : { description: 'print results'},
  'print-http' : { description: 'print HTTP requests and responses'},
  'verbose' : { key : 'v', description: 'verbose output'}
});
var verbose = opts["verbose"];
Clarifai.setVerbose( verbose );
if( opts["print-http"] ) {
  Clarifai.setLogHttp( true ) ;
}


module.exports = function( err, res ) {
  // console.log("in result handler", res.results[0].result.tag.classes)
  if( err != null ) {
    if( typeof err["status_code"] === "string" && err["status_code"] === "TIMEOUT") {
      console.log("TAG request timed out");
    }
    else if( typeof err["status_code"] === "string" && err["status_code"] === "ALL_ERROR") {
      console.log("TAG request received ALL_ERROR. Contact Clarifai support if it continues.");       
    }
    else if( typeof err["status_code"] === "string" && err["status_code"] === "TOKEN_FAILURE") {
      console.log("TAG request received TOKEN_FAILURE. Contact Clarifai support if it continues.");       
    }
    else if( typeof err["status_code"] === "string" && err["status_code"] === "ERROR_THROTTLED") {
      console.log("Clarifai host is throttling this application.");       
    }
    else {
      console.log("TAG request encountered an unexpected error: ");
      console.log(err);       
    }
  }
  else {
    if( opts["print-results"] ) {
      // if some images were successfully tagged and some encountered errors,
      // the status_code PARTIAL_ERROR is returned. In this case, we inspect the
      // status_code entry in each element of res["results"] to evaluate the individual
      // successes and errors. if res["status_code"] === "OK" then all images were 
      // successfully tagged.
      if( typeof res["status_code"] === "string" && 
        ( res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR" )) {

        // the request completed successfully
        for( i = 0; i < res.results.length; i++ ) {
          if( res["results"][i]["status_code"] === "OK" ) {
            console.log( 'docid='+res.results[i].docid +
              ' local_id='+res.results[i].local_id +
              ' tags='+res["results"][i].result["tag"]["classes"] )
          }
          else {
            console.log( 'docid='+res.results[i].docid +
              ' local_id='+res.results[i].local_id + 
              ' status_code='+res.results[i].status_code +
              ' error = '+res.results[i]["result"]["error"] )
          }
        }

      }
    }     
  }
}