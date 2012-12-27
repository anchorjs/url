# Anchor/URL

The URL module has utilities for URL resolution and parsing.

## Install

##### volo

    $ volo add anchorjs/url

For more information on using volo to manage JavaScript modules, visit [http://volojs.org/](http://volojs.org/).

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

## Interfaces

This module conforms to the interface exported by Node's [URL](http://nodejs.org/api/url.html)
module.

## Tests

##### Browser

To run tests in a browser, execute the Make target for the desired browser:

    $ make test-chrome
    $ make test-firefox
    $ make test-safari

##### PhantomJS

To run headless tests from a terminal using [PhantomJS](http://phantomjs.org/):

    $ make test-phantomjs

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
Copyright Joyent, Inc. and other Node contributors.
