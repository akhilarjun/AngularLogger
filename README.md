# AngularLogger
This module can be used in angular 1.* applications to replace the traditional console.log operations. This module comes with many features including directly making rest calls for configured error logs.

## How To:
First you have to include the _angular-logger.js_ file to your page, after including the AngularJS
```html
<script type="text/javascript" src='js/angular-1.*.js'></script>
<script type="text/javascript" src='js/angular-logger.js'></script>
```
And then initialise it in your angular application as follows,
```js

var app = angular.module("app",['xLogger']);

```

Now include the _xLogger_ service to your controller and Voila! you get your logger ready to use
```js

app.controller("demoController",["$scope","xLogger",function($scope,xLogger){
  xLogger.log('Standard LOG');
}]);

```
Or, for minimal code change, give the _xLogger_ service an alias like _console_ and the code should look like this 
```js

app.controller("demoController",["$scope","xLogger",function($scope,console){
  console.log('Standard LOG');
}]);

```
### API's
Angular Logger comes with a plethora of configurations.
To configure the logger you need to inject _xLoggerProvider_ in your **config** function
```js

app.config(['xLoggerProvider', function (xLoggerProvider) {
  //configurations go here...
}]);

```
**getContext** : This method accepts the application name, or the context name which can be later used to filter logs. This is a mandate method, without it the Logger would throw an error
```js
xLoggerProvider.getContext('AsyncLoggerDemo');
```
**printLogs** : This method can be used to control turn on or off all the logs that are printed in the console. This way you can turn on the logs during development and then turn it of during the actual production code
```js
//This defaults to true
xLoggerProvider.printLogs(false);

```
**setDateFormat** : This method can be used to format the date that will be printed along with the logs
```js
xLoggerProvider.setDateFormat('dd-MMM hh:mm:ss a');
```
**writeToServer** : This is a boolean method which tells the logger if it should write logs to server or not.
```js
//Defaults to true
xLoggerProvider.writeToServer(false);
```
**setTypesOfLogsToWrite** : This method accepts the type of logs that you need to write to server. It accepts a string with the types comma seperated
```js
//supported types are log,error,debug,info,warn
xLoggerProvider.setTypesOfLogsToWrite('error');
//If multiple types of logs are to be written to server
xLoggerProvider.setTypesOfLogsToWrite('error,debug');
```
**setServiceURLs** : Set the URL's to be hit when particular logs are to be written on server
```js
xLoggerProvider.setServiceURLs('error', 'rest/writeErrorLogFromJS');
xLoggerProvider.setServiceURLs('debug', 'rest/writeDebugLogFromJS');
```
**setMethod** : Change the method to send data to application
```js
//Supports 'GET', 'POST'
xLoggerProvider.setMethod('get');
```
**setCustomCss** : With this method you can style how your logs should look like. You have to pass style definitions and not class names
```js
xLoggerProvider.setCustomCss('log', 'background:#333;color:#2ee8a1;');
xLoggerProvider.setCustomCss('info', 'background:#ddd;color:#39c;');
```
