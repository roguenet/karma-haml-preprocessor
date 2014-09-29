karma-preprocessor-haml
=======================
> A Karma preprocessor that Compile haml script to html.

**WARNING**: This is a hacked version of [karma-haml-preprocessor](https://github.com/ondrasak/karma-haml-preprocessor)
which now requires [haml](https://github.com/haml/haml) to run.
This was done to allow multiline element declarations which
[doesn't work in haml-js](https://github.com/creationix/haml-js/issues/74).

**Supports [haml-js][] and [haml-coffee][] as language compilers**

[haml-coffee]: https://github.com/netzpirat/haml-coffee
[haml-js]: https://github.com/creationix/haml-js

## Installation

The easiest way is to keep `karma-haml-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma-haml-preprocessor": "~0.2"
  }
}
```

You can simple do it by:
```
npm install karma-haml-preprocessor
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    files: [
      '*.haml'
    ],
    preprocessors: {
      'app/assets/javascripts/**/*.haml'   : 'haml'
    }
  });
};
```

### Options


```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    ...
    hamlPreprocessor: {
      options: {
        language: 'coffee'
      }
    }
  });
};
```


#### language

Type: `string`  
Default: `js`  
Accepted values: `js`, `coffee`

Specifies the script language and compiler to use alongside HAML.
`js` will use [haml-js][], `coffee` uses [haml-coffee][]
