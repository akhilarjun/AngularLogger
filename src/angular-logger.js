/*
    Angular Logger v1.0
    (c) 2016 Akhil Arjun. https://github.com/akhilarjun/AngularLogger
    License: MIT
*/
var xlogger = window.angular.module('xLogger', []);

xlogger.provider('xLogger', function () {
    'use strict';
    var loggerConfig = {
        printLogs : true,
        writeToServer : true,
        context : undefined,
        typeOfLogsToWrite : undefined,
        dateFormat : 'dd-MMM-yyyy HH:mm:ss',
        method : 'POST',
        serviceURLs : {
            info : undefined,
            error : undefined,
            warn : undefined,
            debug : undefined,
            log : undefined
        },
        logCustomCss : {
            info : undefined,
            error : undefined,
            warn : undefined,
            debug : undefined,
            log : undefined
        }
    };
    this.printLogs = function (condition) {
        loggerConfig.printLogs = !!condition;
    };
    this.writeToServer = function (condition) {
        loggerConfig.writeToServer = !!condition;
    };
    this.setMethod = function (method) {
        if (method.toLowerCase() === 'post' || method.toLowerCase() === 'get') {
            loggerConfig.method = method;
        } else {
            throw new Error('Invalid Method');
        }
    };
    this.setTypesOfLogsToWrite = function (types) {
        var typesArr = types.split(','), index = 0;
        for (index = 0; index < typesArr.length; index = index + 1) {
            typesArr[index] = typesArr[index].trim();
        }
        loggerConfig.typeOfLogsToWrite = typesArr;
    };
    this.getContext = function (context) {
        loggerConfig.context = context;
    };
    this.setDateFormat = function (dateFormat) {
        loggerConfig.dateFormat = dateFormat;
    };
    this.setServiceURLs = function (type, url) {
        type = type.toLowerCase();
        loggerConfig.serviceURLs[type] = url;
    };
    this.setCustomCss = function (type, style) {
        type = type.toLowerCase();
        loggerConfig.logCustomCss[type] = style;
    };
    this.$get = ['$log', 'dateFilter', '$http', function ($log, dateFilter, http) {
        if (!loggerConfig.context) {
            throw new Error('Context Is Not Set For Logger Instance');
        }
        var checkArrayContains = function (a, obj) {
            var i = 0;
            for (i = 0; a && obj && i < a.length; i = i + 1) {
                if (a[i].toLowerCase() === obj.toLowerCase()) {
                    return true;
                }
            }
            return false;
        },
            checkAndWriteToServer = function (input, type) {
                if (loggerConfig.writeToServer && checkArrayContains(loggerConfig.typeOfLogsToWrite, type)) {
                    var urlToHit;
                    switch (type) {
                    case 'LOG':
                        urlToHit = loggerConfig.serviceURLs.log;
                        break;
                    case 'INFO':
                        urlToHit = loggerConfig.serviceURLs.info;
                        break;
                    case 'WARN':
                        urlToHit = loggerConfig.serviceURLs.warn;
                        break;
                    case 'DEBUG':
                        urlToHit = loggerConfig.serviceURLs.debug;
                        break;
                    case 'ERROR':
                        urlToHit = loggerConfig.serviceURLs.error;
                        break;
                    }
                    http({method : loggerConfig.method,
                               url : urlToHit,
                               data : {logData : input}
                              })
                        .success(function () {
                            $log.info('Written To Server');
                        });
                }
            },
            generateLog = function (input, type) {
                var date = dateFilter(new Date(), loggerConfig.dateFormat), logOutPut;
                try {
                    input = JSON.stringify(input);
                } catch (e) {
                    input = input.trim();
                }
                logOutPut = loggerConfig.context + ' | ' + type + ' | ' + input + ' - ' + date;
                checkAndWriteToServer(logOutPut, type);
                return logOutPut;
            };
        return {
            log : function (input) {
                if (!loggerConfig.printLogs) {
                    return false;
                }
                var logStateMent = generateLog(input, 'LOG');
                if (loggerConfig.logCustomCss.log) {
                    $log.log('%c' + logStateMent, loggerConfig.logCustomCss.log);
                } else {
                    $log.log(logStateMent);
                }
            },
            warn : function (input) {
                if (!loggerConfig.printLogs) {
                    return false;
                }
                var logStateMent = generateLog(input, 'WARN');
                if (loggerConfig.logCustomCss.warn) {
                    $log.warn('%c' + logStateMent, loggerConfig.logCustomCss.warn);
                } else {
                    $log.warn(logStateMent);
                }
            },
            info : function (input) {
                if (!loggerConfig.printLogs) {
                    return false;
                }
                var logStateMent = generateLog(input, 'INFO');
                if (loggerConfig.logCustomCss.info) {
                    $log.info('%c' + logStateMent, loggerConfig.logCustomCss.info);
                } else {
                    $log.info(logStateMent);
                }
            },
            error : function (input) {
                if (!loggerConfig.printLogs) {
                    return false;
                }
                var logStateMent = generateLog(input, 'ERROR');
                if (loggerConfig.logCustomCss.error) {
                    $log.error('%c' + logStateMent, loggerConfig.logCustomCss.error);
                } else {
                    $log.error(logStateMent);
                }
            },
            debug : function (input) {
                if (!loggerConfig.printLogs) {
                    return false;
                }
                var logStateMent = generateLog(input, 'DEBUG');
                if (loggerConfig.logCustomCss.debug) {
                    $log.debug('%c' + logStateMent, loggerConfig.logCustomCss.debug);
                } else {
                    $log.debug(logStateMent);
                }
            }
        };
    }];
});