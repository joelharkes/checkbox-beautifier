/// <reference path="../src/script.js" />
/// <reference path="../bower_components/jasmine-core/lib/jasmine-core/jasmine.js" />
var checkboxEevents = ["click", "change", "input", "input", "focus", "blur"];
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


    describe('when user clicks on impersonator', function () {
      var lastFocus = null;
      var parentLastFocus = null;
      var focusCount = 0;
      var parentFocusCount = 0;
      var focusListener = function (ev) {
        lastFocus = ev;
        focusCount++;
      }
      var parentFocusListener = function (ev) {
        parentLastFocus = ev;
        parentFocusCount++;
      }
      beforeEach(function () {
        checkbox.parentElement.addEventListener('focus', parentFocusListener);
        checkbox.addEventListener('focus', focusListener);

        beauty.impersonator.focus();
      });
      afterEach(function () {
        checkbox.parentElement.removeEventListener('focus', parentFocusListener);
        checkbox.removeEventListener('focus', focusListener);

        beauty.impersonator.blur();
        focusCount = 0;
        lastFocus = null;
      });
      it('should only have fired focus once', function () {
        expect(focusCount).toBe(1);
      });

      it('should have focus target as input element', function () {
        expect(lastFocus.target).toBe(checkbox);
      });

      it('should have event targeting the input element', function () {
        expect(lastFocus.target).toBe(checkbox);
      });

      it('beautifier should be focused element', function () {
        expect(document.activeElement).toBe(beauty.impersonator);
      })
    });

    describe('when focus is set scriptwise to input', function () {
      var lastFocus = null;
      var parentLastFocus = null;
      var focusCount = 0;
      var parentFocusCount = 0;
      var focusListener = function (ev) {
        lastFocus = ev;
        focusCount++;
      }
      var parentFocusListener = function (ev) {
        parentLastFocus = ev;
        parentFocusCount++;
      }
      beforeEach(function () {
        checkbox.parentElement.addEventListener('focus', parentFocusListener);
        checkbox.addEventListener('focus', focusListener);

        checkbox.focus();
      });
      afterEach(function () {
        checkbox.parentElement.removeEventListener('focus', parentFocusListener);
        checkbox.removeEventListener('focus', focusListener);

        checkbox.blur();
        focusCount = 0;
        lastFocus = null;
      });
      it('should only have fired focus once', function () {
        expect(focusCount).toBe(1);
      });
      it('should have event targeting the input element', function () {
        expect(lastFocus.target).toBe(checkbox);
      });
      it('should not buble to parent', function () {
        expect(parentFocusCount).toBe(0);
      });


      it('beautifier should be focused element', function () {
        expect(document.activeElement).toBe(beauty.impersonator);
      })
    })
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


describe('a checkbox and a beautified checkbox with all event listeners', function () {
  var self = this;
  var selfQ = this;
  beforeEach(function () {
    self = this;
    selfQ = this;
    this.normalContainer = document.createElement('div');
    this.normalCheckbox = document.createElement('input');
    this.normalCheckbox.type = "checkbox";
    this.normalContainer.appendChild(this.normalCheckbox);
    document.body.appendChild(this.normalContainer);


    this.beautyContainer = document.createElement('div');
    this.beautyCheck = document.createElement('input');
    this.beautyCheck.type = 'checkbox';
    this.beautyContainer.appendChild(this.beautyCheck);
    document.body.appendChild(this.beautyContainer);

    this.beauty = new CheckboxBeauty(this.beautyCheck);

    this.normalData = {
    };
    this.beautyData = {
    };

    checkboxEevents.forEach(function (eventName) {
      self.normalContainer.addEventListener(eventName, function (event) {
        self.normalData[eventName + 'Count'] = (self.normalData[eventName + 'Count'] || 0) + 1;
        self.normalData[eventName + 'Event'] = event;
      });
      self.beautyContainer.addEventListener(eventName, function (event) {
        self.beautyData[eventName + 'Count'] = (self.beautyData[eventName + 'Count'] || 0) + 1;
        self.beautyData[eventName + 'Event'] = event;
      });
    });
  });

  afterEach(function () {
    this.beauty.destroy();
    this.beauty = null;

    this.beautyCheck.remove();
    this.beautyContainer.remove()
    this.normalCheckbox.remove();
    this.normalContainer.remove();
  });

  var testAllData = function () {
    checkboxEevents.forEach(function (name) {
      it('should have equal amount of ' + name + ' events', function () {
        expect(self.beautyData[name + 'Count']).toBe(self.normalData[name + 'Count']);
      });
      it('should have on'+name+' targeted input element or be undefined like normal', function () {
        if (typeof self.beautyData[name + 'Event'] === 'undefined')
          expect(self.beautyData[name + 'Event']).toBe(self.normalData[name + 'Event'])
        else
          expect(self.beautyData[name + 'Event'].target).toBe(self.beautyCheck);
      });
      it('should both have same checked value',function () {
        expect(self.beautyCheck.checked).toBe(self.normalCheckbox.checked);
      })
    })

  }
  describe('when clicked', function () {
    beforeEach(function () {
      self.normalCheckbox.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      self.beautyCheck.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    });
    testAllData();
  });
  
   describe('when clicked on beauty', function () {
    beforeEach(function () {
      self.normalCheckbox.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      self.beauty.impersonator.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    });
    testAllData();
  });
  
  describe('when focus called',function () {
    beforeEach(function () {
      self.normalCheckbox.focus();
      self.beautyCheck.focus();
    });
    testAllData();
    
  })
  
  describe('when focus called on beauty',function () {
    beforeEach(function () {
      self.normalCheckbox.focus();
      self.beauty.impersonator.focus();
    });
    testAllData();
  });
  
  describe('when checked is set to true on input',function () {
    beforeEach(function () {
      self.normalCheckbox.checked = true;
      self.beautyCheck.checked = true;
    });
    testAllData();
  });
  
   describe('when change is called',function () {
    beforeEach(function () {
      self.normalCheckbox.dispatchEvent(new Event('change',{bubbles : true}));
      self.beautyCheck.dispatchEvent(new Event('change',{bubbles : true}));
    });
    testAllData();
  });
})