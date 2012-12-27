define(['url/lib/file'],
function(file) {

  describe('url/file', function() {
    
    it('should export create', function() {
      expect(file.create).to.be.a('function');
    });
    
    it('should export revoke', function() {
      expect(file.revoke).to.be.a('function');
    });
    
  });
  
  return { name: "test.url.file" }
});
