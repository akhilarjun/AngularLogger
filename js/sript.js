var app = window.angular.module('demo-app', ['xLogger']);

app.config(['xLoggerProvider', function (xLoggerProvider) {
    'use strict';
    //Setting this flag false will prevent the logs being printed on console
    //Defaults to true
    xLoggerProvider.printLogs(true);
    //Set this to false to prevent logger from writing to server
    //Defaults to true
    xLoggerProvider.writeToServer(false);
    //customise date format
    xLoggerProvider.setDateFormat('dd-MMM hh:mm:ss a');
    //Set Comma seperated types that need to be written on server 
    //e.g : 'error,log,debug'
    //supported types are log,error,debug,info,warn
    xLoggerProvider.setTypesOfLogsToWrite('error,debug');
    //set the context for logger
    //This is a mandate input
    xLoggerProvider.getContext('AsyncLoggerDemo');
    //Set the URL's to be hit when particular logs are to be written on server
    xLoggerProvider.setServiceURLs('error', 'rest/writeErrorLogFromJS');
    xLoggerProvider.setServiceURLs('debug', 'rest/writeDebugLogFromJS');
    //Change the method to send data to application
    //Supports 'GET', 'POST'
    xLoggerProvider.setMethod('get');
    //You can style how your logs should look like
    //You have to pass style definitions and not class names
    xLoggerProvider.setCustomCss('log', 'background:#333;color:#2ee8a1;');
}]);

app.controller('demoController', ['xLogger', function (logger) {
    'use strict';
    var emp = {
        name : 'Akhil Arjun',
        plugin : 'xLogger'
    };
    logger.info(emp);
    logger.error('Error Occured');
    logger.warn('Warning');
    logger.log('Standard LOG');
    logger.debug('Debugged');
}]);