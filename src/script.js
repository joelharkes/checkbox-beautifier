/**
 * @description a function to beautify your checkbox element but keep all your events working correctly
 * @param  {HTMLElement} checkElement
 */
var CheckboxBeauty = function (checkElement) {
    'user strict';
    if (checkElement.type !== 'checkbox')
        throw new Error('CheckboxBeauty can only beautify a checkbox')
    this.input = checkElement;
    var input = checkElement;
    var self = this;

    this.options = {
        class: "checkbox",
        checkedClass: "checked",
        afterImpersonate: function (inputEl) {
            //inputEl.className += "hidden";
            inputEl.style += ";display:none;";
        }
    }
    // chache if its checked, needed?
    this.checked = self.input.checked;

    var impersonator = document.createElement("div");
    this.impersonator = impersonator;

    impersonator.className = "checkbox"
    impersonator.tabIndex = 0; //Make him tab-able
    if (self.checked)
        impersonator.className += " checked";
    self.input.parentNode.insertBefore(impersonator, input.nextSibling)
    impersonator.innerText = "x";
    this.options.afterImpersonate(self.input);
    
    
    //Setup event listeners
    this.impersonatorClick = function (ev) {
        if (!ev.pluginMade) 
            input.checked = !input.checked;
        self.checked = input.checked;
        if (self.checked)
            impersonator.className += ' checked'
        else
            impersonator.className = 'checkbox'
        if (!ev.pluginMade) {
            input.dispatchEvent(self.makeEvent("click"));
            input.dispatchEvent(self.makeEvent("change"));
        }
    }

    this.impersonatorKeydown =  function (ev) {
        //32 = space bar, normaly spacebar on checkbox fires mouse click event
        if (ev.keyCode == 32) {
            impersonator.dispatchEvent(new Event("click")); //Make it look like an original event
        }
    }
    this.inputClick =  function (ev) {
        //console.log("click", ev);
        if (!ev.pluginMade) {
            impersonator.dispatchEvent(self.makeEvent("click"))
            //fakeBox.dispatchEvent(makeEvent("change"))
        }
    }
    this.inputChange =  function (ev) {
        //console.log("change", input.checked);
    }

    var inputInput = function (ev) {
        console.log("input", input.checked);
    }
    
    
    this.addListeners();
}

CheckboxBeauty.prototype.makeEvent = function (name) {
    var ev = new Event(name);
    ev.pluginMade = true;
    return ev;
};

CheckboxBeauty.prototype.addListeners = function () {
    this.impersonator.addEventListener("click", this.impersonatorClick);
    this.impersonator.addEventListener("keydown", this.impersonatorKeydown);
    this.input.addEventListener("click",this.inputClick);
    this.input.addEventListener("change",this.inputChange);
    this.input.addEventListener("input", this.inputInput);
};
CheckboxBeauty.prototype.removeListeners = function () {
    this.impersonator.removeEventListener("click", this.impersonatorClick);
    this.impersonator.removeEventListener("keydown", this.impersonatorKeydown);
    this.input.removeEventListener("click",this.inputClick);
    this.input.removeEventListener("change",this.inputChange);
    this.input.removeEventListener("input",this.inputInput);
};
CheckboxBeauty.prototype.destroy = function () {
    this.removeListeners();
    this.impersonator.remove();    
}