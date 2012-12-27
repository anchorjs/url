/**
 * url/file
 *
 * This module extends the `url` module with HTML5 features defined by the File
 * API.
 *
 * References:
 *  - [File API](http://www.w3.org/TR/FileAPI/#creating-revoking)
 *  - [Media Capture and Streams](http://www.w3.org/TR/mediacapture-streams/#url)
 *  - [URL](http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html)
 *  - [URL (WHATWG)](http://url.spec.whatwg.org/)
 */
define(['exports'],
function(exports) {

  var URL = window.URL ||
            window.webkitURL;

  /**
   * Creates a new object URL.
   *
   * References:
   *  - [MDN > DOM](https://developer.mozilla.org/en-US/docs/DOM/window.URL.createObjectURL)
   *  - [Windows Dev Center > Windows Store](http://msdn.microsoft.com/en-us/library/windows/apps/hh453196.aspx)
   *
   * @param {File|MediaStream} obj
   * @api public
   */
  function create(obj) {
    return URL.createObjectURL(obj);
  }

  /**
   * Releases an existing object URL.
   *
   * References:
   *  - [MDN > DOM](https://developer.mozilla.org/en-US/docs/DOM/window.URL.revokeObjectURL)
   *  - [Windows Dev Center > Windows Store](http://msdn.microsoft.com/en-us/library/windows/apps/hh441186.aspx)
   *
   * @param {String} url
   * @api public
   */
  function revoke(url) {
    URL.revokeObjectURL(url);
  }

  exports.create = create;
  exports.revoke = revoke;
});
