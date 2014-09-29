var createHamlPreprocessor = function(args, config, logger, helper) {
  config = config || {};
  var log = logger.create('preprocessor.haml');

  var defaultOptions = {
    language: 'js'
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  //

  var transpileJS = function(content, file, done) {
    var compiled = '';
    var haml = require('child_process').spawn('haml');

    haml.stdout.on('data', function (data) {
      compiled = (data || '').toString();
    });
    haml.on('exit', function (code) {
      done(null, compiled);
    });
    haml.stdin.write(content);
    haml.stdin.end();
  };

  var transpileCoffee = function(content, file, done) {
    var hamlc = require('haml-coffee');

    var compiled = hamlc.compile(content)();
    done(compiled);
  };

  //

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);

    switch(options.language) {
      case 'js' :
        transpileJS(content, file, done);
        break;
      case 'coffee' :
        transpileCoffee(content, file, done);
        break;
      default :
        log.error('Language "%s" is not a valid source language for the hamlPreprocessor. Available options are `js` and `coffee`.', options.language);
    }

  };
};

createHamlPreprocessor.$inject = ['args', 'config.hamlPreprocessor', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:haml': ['factory', createHamlPreprocessor]
};
