define(['url'],
function(url) {

  describe('File API', function() {
    
    it('should export create', function() {
      expect(url.create).to.be.a('function');
    });
    
    it('should export revoke', function() {
      expect(url.revoke).to.be.a('function');
    });
    
  });
  
  return { name: "test.url" }
});
