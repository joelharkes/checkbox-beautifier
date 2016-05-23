/// <reference path="../src/script.js" />
/// <reference path="../bower_components/jasmine-core/lib/jasmine-core/jasmine.js" />

describe('a default checkbox in the page', function () {
  /** @type {HTMLInputElement} */
  var checkbox;

  beforeEach(function () {
    checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    document.body.appendChild(checkbox);
  });
  afterEach(function () {
    checkbox.remove();
  });

  describe('and beautified', function () {
    /** @type {CheckboxBeauty} beauty */
    var beauty;

    beforeEach(function () {
      beauty = new CheckboxBeauty(checkbox);
    });

    afterEach(function () {
      beauty.destroy();
      beauty = null;
    });

    it('should be upgradeable', function () {
      expect(beauty).not.toBe(null); //toEqual("DIV");
      expect(beauty.input).toBe(checkbox);
    });

    it('should be unchecked', function () {
      expect(beauty.checked).not.toBe(true);
      expect(checkbox.checked).not.toBe(true);
    });


    describe('and (artificialy) clicked on input checkbox', function () {
      var clickCount = 0;
      var changeCount = 0;
      /** @type {MouseEvent} */
      var lastClick = null;
      var clickListener = function (event) {
        clickCount++;
        lastClick = event;
      }
      var changeListener = function (event) {
        changeCount++;
      }
      beforeEach(function () {
        clickCount = 0;
        changeCount = 0;
        lastClick = null;
        checkbox.parentElement.addEventListener("click", clickListener);
        checkbox.parentElement.addEventListener("change", changeListener);

        var evt = new MouseEvent('click', { bubbles: true, cancelable: true });
        checkbox.dispatchEvent(evt);
      });

      afterEach(function () {
        checkbox.parentElement.removeEventListener("click", clickListener);
        checkbox.parentElement.removeEventListener("change", changeListener);
      });
      it('should input be checked', function () {
        expect(checkbox.checked).toBe(true);
      });
      it('should beautifier be checked', function () {
        expect(beauty.checked).toBe(true);
      });

      it('click event should only buble once', function () {

        expect(clickCount).toBe(1);
      });


      it('click event target should be the input checkbox', function () {
        expect(lastClick.target).toBe(checkbox);
      });

      it('change event should only buble once', function () {
        expect(changeCount).toBe(1);
      });

    });



    describe('and (artificialy) clicked on impersonator', function () {
      var clickCount = 0;
      var changeCount = 0;
      /** @type {MouseEvent} */
      var lastClick = null;
      var clickListener = function (event) {
        clickCount++;
        lastClick = event;
      }
      var changeListener = function (event) {
        changeCount++;
      }
      beforeEach(function () {
        clickCount = 0;
        changeCount = 0;
        lastClick = null;
        checkbox.parentElement.addEventListener("click", clickListener);
        checkbox.parentElement.addEventListener("change", changeListener);

        var evt = new MouseEvent('click', { bubbles: true, cancelable: true });
        beauty.impersonator.dispatchEvent(evt);
      });

      afterEach(function () {
        checkbox.parentElement.removeEventListener("click", clickListener);
        checkbox.parentElement.removeEventListener("change", changeListener);
      });
      it('should input be checked', function () {
        expect(checkbox.checked).toBe(true);
      });
      it('should beautifier be checked', function () {
        expect(beauty.checked).toBe(true);
      });

      it('click event should only buble once', function () {
        expect(clickCount).toBe(1);
      });


      it('click event target should be the input checkbox', function () {
        expect(lastClick.target).toBe(checkbox);
      });

      it('change event should only buble once', function () {
        expect(changeCount).toBe(1);
      });

    });

    describe("and manualy set input checked", function () {
      beforeEach(function () {
        checkbox.checked = true;
      });

      afterEach(function () {
        checkbox.checked = false;
      });

      it('should also set impersonator checked', function () {
        expect(beauty.checked).toBe(true)
      });

      describe("and set back to unchecked", function () {
        beforeEach(function () {
          checkbox.checked = false;
        });

        afterEach(function () {
          checkbox.checked = true;
        });

        it('should also set impersonator unchecked', function () {
          expect(beauty.checked).not.toBe(true)
        });

      })
    });

    describe('and then destroyed', function () {
      beforeEach(function () {
        beauty.destroy();
      });
      it('should not be in the dom anymore', function () {
        expect(document.contains(beauty.impersonator)).not.toBe(true);
      })
    });
  });

  describe('clicked on (make it checked)', function () {
    beforeEach(function () {
      var evt = new MouseEvent('click');
      checkbox.dispatchEvent(evt);
    });

    afterEach(function () {
      //click again to uncheck
      var evt = new MouseEvent('click');
      checkbox.dispatchEvent(evt);
    });

    describe('and beautified', function () {
      /** @type {CheckboxBeauty} */
      var beauty;

      beforeEach(function () {
        beauty = new CheckboxBeauty(checkbox);
      });

      afterEach(function () {
        beauty.destroy();
        beauty = null;
      });

      it('should be checked', function () {
        expect(beauty.checked).toBe(true);
        expect(checkbox.checked).toBe(true);
      });

    });

  });
});