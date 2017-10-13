var fs = require('fs');
var path = require('path');
var request = require('request');
var unzip = require('unzip2');

var codeGenEndpoint = 'http://generator.swagger.io/api/gen/clients';
var language = 'typescript-angular2';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


fs.readFile(path.resolve('api-docs.json'), 'utf8', function (error, json) {
    if (error) {
        throw error;
    }

    var swaggerObj = JSON.parse(json);

    var postBody = {
        spec: swaggerObj,
        options: {
            modelPropertyNaming: 'camelCase',
            apiPackage: 'service',
            modelPackage: 'model'
        }
    };

    request.post({
        url: codeGenEndpoint + '/' + language,
        body: JSON.stringify(postBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }, function(error, response, body){
        if (error) {
            throw error;
        }

        if (response.statusCode !== 200) {
            throw new Error('Response code was not 200. ' + body)
        }

        var responseObj = JSON.parse(body);

        request({
            url: responseObj.link,
            encoding: null
        }).pipe(unzip.Extract({ path: 'generated'}));
    });
});
