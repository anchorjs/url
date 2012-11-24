define(['exports'],
function(exports) {
  
  // http://dev.w3.org/2006/webapi/FileAPI/#URL-object
  // https://developer.mozilla.org/en-US/docs/DOM/window.URL
  // https://developer.mozilla.org/en-US/docs/DOM/window.URL.createObjectURL
  // https://developer.mozilla.org/en-US/docs/DOM/window.URL.revokeObjectURL
  // http://msdn.microsoft.com/en-us/library/windows/apps/hh453196.aspx
  // http://dev.w3.org/2011/webrtc/editor/getusermedia.html#url

  var URL = window.URL ||
            window.webkitURL;

  function create(obj) {
    return URL.createObjectURL(obj);
  }

  function revoke() {
    // TODO:
  }

  exports.create = create;
  exports.revoke = revoke;
});
