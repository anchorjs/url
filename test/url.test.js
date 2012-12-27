define(['url'],
function(url) {

  describe('URL', function() {
  
    describe('File API', function() {
      it('should augment URL with create', function() {
        expect(url.create).to.be.a('function');
      });
      
      it('should augment URL with revoke', function() {
        expect(url.revoke).to.be.a('function');
      });
    });
  
  });

  describe('URL - Node implementation', function() {
    
    describe('parse tests', function() {
      var parseTests = {
        '//some_path' : {
          'href': '//some_path',
          'pathname': '//some_path',
          'path': '//some_path'
        },
        
        'HTTP://www.example.com/' : {
          'href': 'http://www.example.com/',
          'protocol': 'http:',
          'slashes': true,
          'host': 'www.example.com',
          'hostname': 'www.example.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://www.ExAmPlE.com/' : {
          'href': 'http://www.example.com/',
          'protocol': 'http:',
          'slashes': true,
          'host': 'www.example.com',
          'hostname': 'www.example.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://user:pw@www.ExAmPlE.com/' : {
          'href': 'http://user:pw@www.example.com/',
          'protocol': 'http:',
          'slashes': true,
          'auth': 'user:pw',
          'host': 'www.example.com',
          'hostname': 'www.example.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://USER:PW@www.ExAmPlE.com/' : {
          'href': 'http://USER:PW@www.example.com/',
          'protocol': 'http:',
          'slashes': true,
          'auth': 'USER:PW',
          'host': 'www.example.com',
          'hostname': 'www.example.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://user@www.example.com/' : {
          'href': 'http://user@www.example.com/',
          'protocol': 'http:',
          'slashes': true,
          'auth': 'user',
          'host': 'www.example.com',
          'hostname': 'www.example.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://user%3Apw@www.example.com/' : {
          'href': 'http://user:pw@www.example.com/',
          'protocol': 'http:',
          'slashes': true,
          'auth': 'user:pw',
          'host': 'www.example.com',
          'hostname': 'www.example.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://x.com/path?that\'s#all, folks' : {
          'href': 'http://x.com/path?that%27s#all,%20folks',
          'protocol': 'http:',
          'slashes': true,
          'host': 'x.com',
          'hostname': 'x.com',
          'search': '?that%27s',
          'query': 'that%27s',
          'pathname': '/path',
          'hash': '#all,%20folks',
          'path': '/path?that%27s'
        },
      
        'HTTP://X.COM/Y' : {
          'href': 'http://x.com/Y',
          'protocol': 'http:',
          'slashes': true,
          'host': 'x.com',
          'hostname': 'x.com',
          'pathname': '/Y',
          'path': '/Y'
        },
      
        // an unexpected invalid char in the hostname.
        'HtTp://x.y.cOm*a/b/c?d=e#f g<h>i' : {
          'href': 'http://x.y.com/*a/b/c?d=e#f%20g%3Ch%3Ei',
          'protocol': 'http:',
          'slashes': true,
          'host': 'x.y.com',
          'hostname': 'x.y.com',
          'pathname': '/*a/b/c',
          'search': '?d=e',
          'query': 'd=e',
          'hash': '#f%20g%3Ch%3Ei',
          'path': '/*a/b/c?d=e'
        },
      
        // make sure that we don't accidentally lcast the path parts.
        'HtTp://x.y.cOm*A/b/c?d=e#f g<h>i' : {
          'href': 'http://x.y.com/*A/b/c?d=e#f%20g%3Ch%3Ei',
          'protocol': 'http:',
          'slashes': true,
          'host': 'x.y.com',
          'hostname': 'x.y.com',
          'pathname': '/*A/b/c',
          'search': '?d=e',
          'query': 'd=e',
          'hash': '#f%20g%3Ch%3Ei',
          'path': '/*A/b/c?d=e'
        },
      
        'http://x...y...#p': {
          'href': 'http://x...y.../#p',
          'protocol': 'http:',
          'slashes': true,
          'host': 'x...y...',
          'hostname': 'x...y...',
          'hash': '#p',
          'pathname': '/',
          'path': '/'
        },
      
        'http://x/p/"quoted"': {
          'href': 'http://x/p/%22quoted%22',
          'protocol': 'http:',
          'slashes': true,
          'host': 'x',
          'hostname': 'x',
          'pathname': '/p/%22quoted%22',
          'path': '/p/%22quoted%22'
        },
      
        '<http://goo.corn/bread> Is a URL!': {
          'href': '%3Chttp://goo.corn/bread%3E%20Is%20a%20URL!',
          'pathname': '%3Chttp://goo.corn/bread%3E%20Is%20a%20URL!',
          'path': '%3Chttp://goo.corn/bread%3E%20Is%20a%20URL!'
        },
      
        'http://www.narwhaljs.org/blog/categories?id=news' : {
          'href': 'http://www.narwhaljs.org/blog/categories?id=news',
          'protocol': 'http:',
          'slashes': true,
          'host': 'www.narwhaljs.org',
          'hostname': 'www.narwhaljs.org',
          'search': '?id=news',
          'query': 'id=news',
          'pathname': '/blog/categories',
          'path': '/blog/categories?id=news'
        },
      
        'http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=' : {
          'href': 'http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=',
          'protocol': 'http:',
          'slashes': true,
          'host': 'mt0.google.com',
          'hostname': 'mt0.google.com',
          'pathname': '/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=',
          'path': '/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s='
        },
      
        'http://mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=' : {
          'href': 'http://mt0.google.com/vt/lyrs=m@114???&hl=en&src=api' +
              '&x=2&y=2&z=3&s=',
          'protocol': 'http:',
          'slashes': true,
          'host': 'mt0.google.com',
          'hostname': 'mt0.google.com',
          'search': '???&hl=en&src=api&x=2&y=2&z=3&s=',
          'query': '??&hl=en&src=api&x=2&y=2&z=3&s=',
          'pathname': '/vt/lyrs=m@114',
          'path': '/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s='
        },
      
        'http://user:pass@mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=':
            {
              'href': 'http://user:pass@mt0.google.com/vt/lyrs=m@114???' +
                  '&hl=en&src=api&x=2&y=2&z=3&s=',
              'protocol': 'http:',
              'slashes': true,
              'host': 'mt0.google.com',
              'auth': 'user:pass',
              'hostname': 'mt0.google.com',
              'search': '???&hl=en&src=api&x=2&y=2&z=3&s=',
              'query': '??&hl=en&src=api&x=2&y=2&z=3&s=',
              'pathname': '/vt/lyrs=m@114',
              'path': '/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s='
            },
      
        'file:///etc/passwd' : {
          'href': 'file:///etc/passwd',
          'slashes': true,
          'protocol': 'file:',
          'pathname': '/etc/passwd',
          'hostname': '',
          'host': '',
          'path': '/etc/passwd'
        },
      
        'file://localhost/etc/passwd' : {
          'href': 'file://localhost/etc/passwd',
          'protocol': 'file:',
          'slashes': true,
          'pathname': '/etc/passwd',
          'hostname': 'localhost',
          'host': 'localhost',
          'path': '/etc/passwd'
        },
      
        'file://foo/etc/passwd' : {
          'href': 'file://foo/etc/passwd',
          'protocol': 'file:',
          'slashes': true,
          'pathname': '/etc/passwd',
          'hostname': 'foo',
          'host': 'foo',
          'path': '/etc/passwd'
        },
      
        'file:///etc/node/' : {
          'href': 'file:///etc/node/',
          'slashes': true,
          'protocol': 'file:',
          'pathname': '/etc/node/',
          'hostname': '',
          'host': '',
          'path': '/etc/node/'
        },
      
        'file://localhost/etc/node/' : {
          'href': 'file://localhost/etc/node/',
          'protocol': 'file:',
          'slashes': true,
          'pathname': '/etc/node/',
          'hostname': 'localhost',
          'host': 'localhost',
          'path': '/etc/node/'
        },
      
        'file://foo/etc/node/' : {
          'href': 'file://foo/etc/node/',
          'protocol': 'file:',
          'slashes': true,
          'pathname': '/etc/node/',
          'hostname': 'foo',
          'host': 'foo',
          'path': '/etc/node/'
        },
      
        'http:/baz/../foo/bar' : {
          'href': 'http:/baz/../foo/bar',
          'protocol': 'http:',
          'pathname': '/baz/../foo/bar',
          'path': '/baz/../foo/bar'
        },
      
        'http://user:pass@example.com:8000/foo/bar?baz=quux#frag' : {
          'href': 'http://user:pass@example.com:8000/foo/bar?baz=quux#frag',
          'protocol': 'http:',
          'slashes': true,
          'host': 'example.com:8000',
          'auth': 'user:pass',
          'port': '8000',
          'hostname': 'example.com',
          'hash': '#frag',
          'search': '?baz=quux',
          'query': 'baz=quux',
          'pathname': '/foo/bar',
          'path': '/foo/bar?baz=quux'
        },
      
        '//user:pass@example.com:8000/foo/bar?baz=quux#frag' : {
          'href': '//user:pass@example.com:8000/foo/bar?baz=quux#frag',
          'slashes': true,
          'host': 'example.com:8000',
          'auth': 'user:pass',
          'port': '8000',
          'hostname': 'example.com',
          'hash': '#frag',
          'search': '?baz=quux',
          'query': 'baz=quux',
          'pathname': '/foo/bar',
          'path': '/foo/bar?baz=quux'
        },
      
        '/foo/bar?baz=quux#frag' : {
          'href': '/foo/bar?baz=quux#frag',
          'hash': '#frag',
          'search': '?baz=quux',
          'query': 'baz=quux',
          'pathname': '/foo/bar',
          'path': '/foo/bar?baz=quux'
        },
      
        'http:/foo/bar?baz=quux#frag' : {
          'href': 'http:/foo/bar?baz=quux#frag',
          'protocol': 'http:',
          'hash': '#frag',
          'search': '?baz=quux',
          'query': 'baz=quux',
          'pathname': '/foo/bar',
          'path': '/foo/bar?baz=quux'
        },
      
        'mailto:foo@bar.com?subject=hello' : {
          'href': 'mailto:foo@bar.com?subject=hello',
          'protocol': 'mailto:',
          'host': 'bar.com',
          'auth' : 'foo',
          'hostname' : 'bar.com',
          'search': '?subject=hello',
          'query': 'subject=hello',
          'path': '?subject=hello'
        },
      
        'javascript:alert(\'hello\');' : {
          'href': 'javascript:alert(\'hello\');',
          'protocol': 'javascript:',
          'pathname': 'alert(\'hello\');',
          'path': 'alert(\'hello\');'
        },
      
        'xmpp:isaacschlueter@jabber.org' : {
          'href': 'xmpp:isaacschlueter@jabber.org',
          'protocol': 'xmpp:',
          'host': 'jabber.org',
          'auth': 'isaacschlueter',
          'hostname': 'jabber.org'
        },
      
        'http://atpass:foo%40bar@127.0.0.1:8080/path?search=foo#bar' : {
          'href' : 'http://atpass:foo%40bar@127.0.0.1:8080/path?search=foo#bar',
          'protocol' : 'http:',
          'slashes': true,
          'host' : '127.0.0.1:8080',
          'auth' : 'atpass:foo@bar',
          'hostname' : '127.0.0.1',
          'port' : '8080',
          'pathname': '/path',
          'search' : '?search=foo',
          'query' : 'search=foo',
          'hash' : '#bar',
          'path': '/path?search=foo'
        },
      
        'svn+ssh://foo/bar': {
          'href': 'svn+ssh://foo/bar',
          'host': 'foo',
          'hostname': 'foo',
          'protocol': 'svn+ssh:',
          'pathname': '/bar',
          'path': '/bar',
          'slashes': true
        },
      
        'dash-test://foo/bar': {
          'href': 'dash-test://foo/bar',
          'host': 'foo',
          'hostname': 'foo',
          'protocol': 'dash-test:',
          'pathname': '/bar',
          'path': '/bar',
          'slashes': true
        },
      
        'dash-test:foo/bar': {
          'href': 'dash-test:foo/bar',
          'host': 'foo',
          'hostname': 'foo',
          'protocol': 'dash-test:',
          'pathname': '/bar',
          'path': '/bar'
        },
      
        'dot.test://foo/bar': {
          'href': 'dot.test://foo/bar',
          'host': 'foo',
          'hostname': 'foo',
          'protocol': 'dot.test:',
          'pathname': '/bar',
          'path': '/bar',
          'slashes': true
        },
      
        'dot.test:foo/bar': {
          'href': 'dot.test:foo/bar',
          'host': 'foo',
          'hostname': 'foo',
          'protocol': 'dot.test:',
          'pathname': '/bar',
          'path': '/bar'
        },
      
        // IDNA tests
        'http://www.日本語.com/' : {
          'href': 'http://www.xn--wgv71a119e.com/',
          'protocol': 'http:',
          'slashes': true,
          'host': 'www.xn--wgv71a119e.com',
          'hostname': 'www.xn--wgv71a119e.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://example.Bücher.com/' : {
          'href': 'http://example.xn--bcher-kva.com/',
          'protocol': 'http:',
          'slashes': true,
          'host': 'example.xn--bcher-kva.com',
          'hostname': 'example.xn--bcher-kva.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://www.Äffchen.com/' : {
          'href': 'http://www.xn--ffchen-9ta.com/',
          'protocol': 'http:',
          'slashes': true,
          'host': 'www.xn--ffchen-9ta.com',
          'hostname': 'www.xn--ffchen-9ta.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://www.Äffchen.cOm*A/b/c?d=e#f g<h>i' : {
          'href': 'http://www.xn--ffchen-9ta.com/*A/b/c?d=e#f%20g%3Ch%3Ei',
          'protocol': 'http:',
          'slashes': true,
          'host': 'www.xn--ffchen-9ta.com',
          'hostname': 'www.xn--ffchen-9ta.com',
          'pathname': '/*A/b/c',
          'search': '?d=e',
          'query': 'd=e',
          'hash': '#f%20g%3Ch%3Ei',
          'path': '/*A/b/c?d=e'
        },
      
        'http://SÉLIER.COM/' : {
          'href': 'http://xn--slier-bsa.com/',
          'protocol': 'http:',
          'slashes': true,
          'host': 'xn--slier-bsa.com',
          'hostname': 'xn--slier-bsa.com',
          'pathname': '/',
          'path': '/'
        },
      
        'http://ليهمابتكلموشعربي؟.ي؟/' : {
          'href': 'http://xn--egbpdaj6bu4bxfgehfvwxn.xn--egb9f/',
          'protocol': 'http:',
          'slashes': true,
          'host': 'xn--egbpdaj6bu4bxfgehfvwxn.xn--egb9f',
          'hostname': 'xn--egbpdaj6bu4bxfgehfvwxn.xn--egb9f',
          'pathname': '/',
          'path': '/'
        },
      
        'http://➡.ws/➡' : {
          'href': 'http://xn--hgi.ws/➡',
          'protocol': 'http:',
          'slashes': true,
          'host': 'xn--hgi.ws',
          'hostname': 'xn--hgi.ws',
          'pathname': '/➡',
          'path': '/➡'
        },
      
        'http://bucket_name.s3.amazonaws.com/image.jpg': {
          protocol: 'http:',
          'slashes': true,
          slashes: true,
          host: 'bucket_name.s3.amazonaws.com',
          hostname: 'bucket_name.s3.amazonaws.com',
          pathname: '/image.jpg',
          href: 'http://bucket_name.s3.amazonaws.com/image.jpg',
          'path': '/image.jpg'
        },
      
        'git+http://github.com/joyent/node.git': {
          protocol: 'git+http:',
          slashes: true,
          host: 'github.com',
          hostname: 'github.com',
          pathname: '/joyent/node.git',
          path: '/joyent/node.git',
          href: 'git+http://github.com/joyent/node.git'
        },
      
        //if local1@domain1 is uses as a relative URL it may
        //be parse into auth@hostname, but here there is no
        //way to make it work in url.parse, I add the test to be explicit
        'local1@domain1': {
          'pathname': 'local1@domain1',
          'path': 'local1@domain1',
          'href': 'local1@domain1'
        },
      
        //While this may seem counter-intuitive, a browser will parse
        //<a href='www.google.com'> as a path.
        'www.example.com' : {
          'href': 'www.example.com',
          'pathname': 'www.example.com',
          'path': 'www.example.com'
        },
      
        // ipv6 support
        '[fe80::1]': {
          'href': '[fe80::1]',
          'pathname': '[fe80::1]',
          'path': '[fe80::1]'
        },
      
        'coap://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]': {
          'protocol': 'coap:',
          'slashes': true,
          'host': '[fedc:ba98:7654:3210:fedc:ba98:7654:3210]',
          'hostname': 'fedc:ba98:7654:3210:fedc:ba98:7654:3210',
          'href': 'coap://[fedc:ba98:7654:3210:fedc:ba98:7654:3210]/',
          'pathname': '/',
          'path': '/'
        },
      
        'coap://[1080:0:0:0:8:800:200C:417A]:61616/': {
          'protocol': 'coap:',
          'slashes': true,
          'host': '[1080:0:0:0:8:800:200c:417a]:61616',
          'port': '61616',
          'hostname': '1080:0:0:0:8:800:200c:417a',
          'href': 'coap://[1080:0:0:0:8:800:200c:417a]:61616/',
          'pathname': '/',
          'path': '/'
        },
      
        'http://user:password@[3ffe:2a00:100:7031::1]:8080': {
          'protocol': 'http:',
          'slashes': true,
          'auth': 'user:password',
          'host': '[3ffe:2a00:100:7031::1]:8080',
          'port': '8080',
          'hostname': '3ffe:2a00:100:7031::1',
          'href': 'http://user:password@[3ffe:2a00:100:7031::1]:8080/',
          'pathname': '/',
          'path': '/'
        },
      
        'coap://u:p@[::192.9.5.5]:61616/.well-known/r?n=Temperature': {
          'protocol': 'coap:',
          'slashes': true,
          'auth': 'u:p',
          'host': '[::192.9.5.5]:61616',
          'port': '61616',
          'hostname': '::192.9.5.5',
          'href': 'coap://u:p@[::192.9.5.5]:61616/.well-known/r?n=Temperature',
          'search': '?n=Temperature',
          'query': 'n=Temperature',
          'pathname': '/.well-known/r',
          'path': '/.well-known/r?n=Temperature'
        },
      
        // empty port
        'http://example.com:': {
          'protocol': 'http:',
          'slashes': true,
          'host': 'example.com',
          'hostname': 'example.com',
          'href': 'http://example.com/',
          'pathname': '/',
          'path': '/'
        },
      
        'http://example.com:/a/b.html': {
          'protocol': 'http:',
          'slashes': true,
          'host': 'example.com',
          'hostname': 'example.com',
          'href': 'http://example.com/a/b.html',
          'pathname': '/a/b.html',
          'path': '/a/b.html'
        },
      
        'http://example.com:?a=b': {
          'protocol': 'http:',
          'slashes': true,
          'host': 'example.com',
          'hostname': 'example.com',
          'href': 'http://example.com/?a=b',
          'search': '?a=b',
          'query': 'a=b',
          'pathname': '/',
          'path': '/?a=b'
        },
      
        'http://example.com:#abc': {
          'protocol': 'http:',
          'slashes': true,
          'host': 'example.com',
          'hostname': 'example.com',
          'href': 'http://example.com/#abc',
          'hash': '#abc',
          'pathname': '/',
          'path': '/'
        },
      
        'http://[fe80::1]:/a/b?a=b#abc': {
          'protocol': 'http:',
          'slashes': true,
          'host': '[fe80::1]',
          'hostname': 'fe80::1',
          'href': 'http://[fe80::1]/a/b?a=b#abc',
          'search': '?a=b',
          'query': 'a=b',
          'hash': '#abc',
          'pathname': '/a/b',
          'path': '/a/b?a=b'
        },
      
        'http://-lovemonsterz.tumblr.com/rss': {
          'protocol': 'http:',
          'slashes': true,
          'host': '-lovemonsterz.tumblr.com',
          'hostname': '-lovemonsterz.tumblr.com',
          'href': 'http://-lovemonsterz.tumblr.com/rss',
          'pathname': '/rss',
          'path': '/rss',
        },
      
        'http://-lovemonsterz.tumblr.com:80/rss': {
          'protocol': 'http:',
          'slashes': true,
          'port': '80',
          'host': '-lovemonsterz.tumblr.com:80',
          'hostname': '-lovemonsterz.tumblr.com',
          'href': 'http://-lovemonsterz.tumblr.com:80/rss',
          'pathname': '/rss',
          'path': '/rss',
        },
      
        'http://user:pass@-lovemonsterz.tumblr.com/rss': {
          'protocol': 'http:',
          'slashes': true,
          'auth': 'user:pass',
          'host': '-lovemonsterz.tumblr.com',
          'hostname': '-lovemonsterz.tumblr.com',
          'href': 'http://user:pass@-lovemonsterz.tumblr.com/rss',
          'pathname': '/rss',
          'path': '/rss',
        },
      
        'http://user:pass@-lovemonsterz.tumblr.com:80/rss': {
          'protocol': 'http:',
          'slashes': true,
          'auth': 'user:pass',
          'port': '80',
          'host': '-lovemonsterz.tumblr.com:80',
          'hostname': '-lovemonsterz.tumblr.com',
          'href': 'http://user:pass@-lovemonsterz.tumblr.com:80/rss',
          'pathname': '/rss',
          'path': '/rss',
        },
      
        'http://_jabber._tcp.google.com/test': {
          'protocol': 'http:',
          'slashes': true,
          'host': '_jabber._tcp.google.com',
          'hostname': '_jabber._tcp.google.com',
          'href': 'http://_jabber._tcp.google.com/test',
          'pathname': '/test',
          'path': '/test',
        },
      
        'http://user:pass@_jabber._tcp.google.com/test': {
          'protocol': 'http:',
          'slashes': true,
          'auth': 'user:pass',
          'host': '_jabber._tcp.google.com',
          'hostname': '_jabber._tcp.google.com',
          'href': 'http://user:pass@_jabber._tcp.google.com/test',
          'pathname': '/test',
          'path': '/test',
        },
      
        'http://_jabber._tcp.google.com:80/test': {
          'protocol': 'http:',
          'slashes': true,
          'port': '80',
          'host': '_jabber._tcp.google.com:80',
          'hostname': '_jabber._tcp.google.com',
          'href': 'http://_jabber._tcp.google.com:80/test',
          'pathname': '/test',
          'path': '/test',
        },
      
        'http://user:pass@_jabber._tcp.google.com:80/test': {
          'protocol': 'http:',
          'slashes': true,
          'auth': 'user:pass',
          'port': '80',
          'host': '_jabber._tcp.google.com:80',
          'hostname': '_jabber._tcp.google.com',
          'href': 'http://user:pass@_jabber._tcp.google.com:80/test',
          'pathname': '/test',
          'path': '/test',
        },
      }
    
      it('should parse as expected', function() {
        for (var u in parseTests) {
          var actual = url.parse(u),
              spaced = url.parse('     \t  ' + u + '\n\t'),
              expected = parseTests[u];
              
          Object.keys(actual).forEach(function (i) {
            if (expected[i] === undefined && actual[i] === null) {
              expected[i] = null;
            }
          });
          
          expect(actual).to.deep.equal(expected);
          expect(spaced).to.deep.equal(expected);
          
          expected = parseTests[u].href,
          actual = url.format(parseTests[u]);
          
          expect(actual).to.equal(expected);
        }
      });
    });
    
    describe('parse tests with query string', function() {
      var parseTestsWithQueryString = {
        '/foo/bar?baz=quux#frag' : {
          'href': '/foo/bar?baz=quux#frag',
          'hash': '#frag',
          'search': '?baz=quux',
          'query': {
            'baz': 'quux'
          },
          'pathname': '/foo/bar',
          'path': '/foo/bar?baz=quux'
        },
        'http://example.com' : {
          'href': 'http://example.com/',
          'protocol': 'http:',
          'slashes': true,
          'host': 'example.com',
          'hostname': 'example.com',
          'query': {},
          'search': '',
          'pathname': '/',
          'path': '/'
        }
      };
      
      it('should parse as expected', function() {
        for (var u in parseTestsWithQueryString) {
          var actual = url.parse(u, true);
          var expected = parseTestsWithQueryString[u];
          for (var i in actual) {
            if (actual[i] === null && expected[i] === undefined) {
              expected[i] = null;
            }
          }
        
          expect(actual).to.deep.equal(expected);
        }
      });
    });
    
    describe('format tests', function() {
      var formatTests = {
        'http://example.com?' : {
          'href': 'http://example.com/?',
          'protocol': 'http:',
          'slashes': true,
          'host': 'example.com',
          'hostname': 'example.com',
          'search': '?',
          'query': {},
          'pathname': '/'
        },
        'http://example.com?foo=bar#frag' : {
          'href': 'http://example.com/?foo=bar#frag',
          'protocol': 'http:',
          'host': 'example.com',
          'hostname': 'example.com',
          'hash': '#frag',
          'search': '?foo=bar',
          'query': 'foo=bar',
          'pathname': '/'
        },
        'http://example.com?foo=@bar#frag' : {
          'href': 'http://example.com/?foo=@bar#frag',
          'protocol': 'http:',
          'host': 'example.com',
          'hostname': 'example.com',
          'hash': '#frag',
          'search': '?foo=@bar',
          'query': 'foo=@bar',
          'pathname': '/'
        },
        'http://example.com?foo=/bar/#frag' : {
          'href': 'http://example.com/?foo=/bar/#frag',
          'protocol': 'http:',
          'host': 'example.com',
          'hostname': 'example.com',
          'hash': '#frag',
          'search': '?foo=/bar/',
          'query': 'foo=/bar/',
          'pathname': '/'
        },
        'http://example.com?foo=?bar/#frag' : {
          'href': 'http://example.com/?foo=?bar/#frag',
          'protocol': 'http:',
          'host': 'example.com',
          'hostname': 'example.com',
          'hash': '#frag',
          'search': '?foo=?bar/',
          'query': 'foo=?bar/',
          'pathname': '/'
        },
        'http://example.com#frag=?bar/#frag' : {
          'href': 'http://example.com/#frag=?bar/#frag',
          'protocol': 'http:',
          'host': 'example.com',
          'hostname': 'example.com',
          'hash': '#frag=?bar/#frag',
          'pathname': '/'
        },
        'http://google.com" onload="alert(42)/' : {
          'href': 'http://google.com/%22%20onload=%22alert(42)/',
          'protocol': 'http:',
          'host': 'google.com',
          'pathname': '/%22%20onload=%22alert(42)/'
        },
        'http://a.com/a/b/c?s#h' : {
          'href': 'http://a.com/a/b/c?s#h',
          'protocol': 'http',
          'host': 'a.com',
          'pathname': 'a/b/c',
          'hash': 'h',
          'search': 's'
        },
        'xmpp:isaacschlueter@jabber.org' : {
          'href': 'xmpp:isaacschlueter@jabber.org',
          'protocol': 'xmpp:',
          'host': 'jabber.org',
          'auth': 'isaacschlueter',
          'hostname': 'jabber.org'
        },
        'http://atpass:foo%40bar@127.0.0.1/' : {
          'href': 'http://atpass:foo%40bar@127.0.0.1/',
          'auth': 'atpass:foo@bar',
          'hostname': '127.0.0.1',
          'protocol': 'http:',
          'pathname': '/'
        },
        'http://atslash%2F%40:%2F%40@foo/' : {
          'href': 'http://atslash%2F%40:%2F%40@foo/',
          'auth': 'atslash/@:/@',
          'hostname': 'foo',
          'protocol': 'http:',
          'pathname': '/'
        },
        'svn+ssh://foo/bar': {
          'href': 'svn+ssh://foo/bar',
          'hostname': 'foo',
          'protocol': 'svn+ssh:',
          'pathname': '/bar',
          'slashes': true
        },
        'dash-test://foo/bar': {
          'href': 'dash-test://foo/bar',
          'hostname': 'foo',
          'protocol': 'dash-test:',
          'pathname': '/bar',
          'slashes': true
        },
        'dash-test:foo/bar': {
          'href': 'dash-test:foo/bar',
          'hostname': 'foo',
          'protocol': 'dash-test:',
          'pathname': '/bar'
        },
        'dot.test://foo/bar': {
          'href': 'dot.test://foo/bar',
          'hostname': 'foo',
          'protocol': 'dot.test:',
          'pathname': '/bar',
          'slashes': true
        },
        'dot.test:foo/bar': {
          'href': 'dot.test:foo/bar',
          'hostname': 'foo',
          'protocol': 'dot.test:',
          'pathname': '/bar'
        },
        // ipv6 support
        'coap:u:p@[::1]:61616/.well-known/r?n=Temperature': {
          'href': 'coap:u:p@[::1]:61616/.well-known/r?n=Temperature',
          'protocol': 'coap:',
          'auth': 'u:p',
          'hostname': '::1',
          'port': '61616',
          'pathname': '/.well-known/r',
          'search': 'n=Temperature'
        },
        'coap:[fedc:ba98:7654:3210:fedc:ba98:7654:3210]:61616/s/stopButton': {
          'href': 'coap:[fedc:ba98:7654:3210:fedc:ba98:7654:3210]:61616/s/stopButton',
          'protocol': 'coap',
          'host': '[fedc:ba98:7654:3210:fedc:ba98:7654:3210]:61616',
          'pathname': '/s/stopButton'
        },
      
        // encode context-specific delimiters in path and query, but do not touch
        // other non-delimiter chars like `%`.
        // <https://github.com/joyent/node/issues/4082>
      
        // `#`,`?` in path
        '/path/to/%%23%3F+=&.txt?foo=theA1#bar' : {
          href : '/path/to/%%23%3F+=&.txt?foo=theA1#bar',
          pathname: '/path/to/%#?+=&.txt',
          query: {
            foo: 'theA1'
          },
          hash: "#bar"
        },
      
        // `#`,`?` in path + `#` in query
        '/path/to/%%23%3F+=&.txt?foo=the%231#bar' : {
          href : '/path/to/%%23%3F+=&.txt?foo=the%231#bar',
          pathname: '/path/to/%#?+=&.txt',
          query: {
            foo: 'the#1'
          },
          hash: "#bar"
        },
      
        // `?` and `#` in path and search
        'http://ex.com/foo%3F100%m%23r?abc=the%231?&foo=bar#frag': {
          href: 'http://ex.com/foo%3F100%m%23r?abc=the%231?&foo=bar#frag',
          protocol: 'http:',
          hostname: 'ex.com',
          hash: '#frag',
          search: '?abc=the#1?&foo=bar',
          pathname: '/foo?100%m#r',
        },
      
        // `?` and `#` in search only
        'http://ex.com/fooA100%mBr?abc=the%231?&foo=bar#frag': {
          href: 'http://ex.com/fooA100%mBr?abc=the%231?&foo=bar#frag',
          protocol: 'http:',
          hostname: 'ex.com',
          hash: '#frag',
          search: '?abc=the#1?&foo=bar',
          pathname: '/fooA100%mBr',
        }
      };
      
      it('should format as expected', function() {
        for (var u in formatTests) {
          var expected = formatTests[u].href;
          delete formatTests[u].href;
          var actual = url.format(u);
          var actualObj = url.format(formatTests[u]);
          
          expect(actual).to.equal(expected);
          expect(actualObj).to.equal(expected);
        }
      });
    });
    
  });
  
  return { name: "test.url" }
});
