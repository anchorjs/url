# Anchor/URL

The URL module has utilities for URL resolution and parsing.

## Install

##### component

    $ component install anchorjs/url

##### volo

    $ volo add anchorjs/url

## Usage

#### Parse

Take a URL string, and return an object.

```javascript
url.parse('http://www.example.com/')
```

#### Format

Take a parsed URL object, and return a formatted URL string.

```javascript
url.format({ 'protocol': 'http:',
             'host': 'www.example.com',
             'pathname': '/' })
```

#### Resolve

Take a base URL, and a href URL, and resolve them as a browser would for an
anchor tag.

```javascript
url.resolve('http://example.com/a', '/b');
```

## Compatibility

##### component

This module uses the [AMD](https://github.com/amdjs/amdjs-api) format.  To
include in component builds, use [component-amd](https://github.com/jaredhanson/component-amd):

    component build -u component-amd

##### Node

This module implements the interface exported by Node's [URL](http://nodejs.org/api/url.html)
module.
    
## Tests

To run tests in a browser, execute the Make target for the desired browser:

    $ make test-chrome
    $ make test-firefox
    $ make test-safari
    
Headless tests can be executed directly from a terminal:
    
    $ make test-phantomjs

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>  
Copyright Joyent, Inc. and other Node contributors.
