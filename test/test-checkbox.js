/// <reference path="../src/script.js" />
/// <reference path="../bower_components/jasmine-core/lib/jasmine-core/jasmine.js" />

describe('the checkbox01', function() {
    var checkbox01 = document.getElementById('test01');
  it('should be upgradeable', function() {
      var beauty = new CheckboxBeauty(checkbox01);
    expect(beauty).not.toBe(null); //toEqual("DIV");
    expect(beauty.input).toBe(checkbox01);
    
  });
});