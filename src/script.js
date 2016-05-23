/**
 * @class CheckboxBeauty
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

    // chache if its checked, needed?
    this.checked = self.input.checked;

    //Track property changes on checked attribute of input element
    Object.defineProperty(self.input, 'checked', {
        configurable: true, // defaults to false
        get: function () {
            return self.checked;
        },
        set: function (checked) {
            if (self.checked != checked) {
                //execute a click event for now? but this should not propegate.
                //in the future it should not trigger a click event but actually set checked witouth triggering any event
                self.input.dispatchEvent(new MouseEvent("click", { 'bubbles': false }));
                //self.checked = checked;
            }
        }
    });

    var impersonator = this.createImpersonator();
    this.impersonator = impersonator;

    if (self.checked)
        this.check(); //So we only have one place to do check code.

    self.input.parentNode.insertBefore(impersonator, input.nextSibling);
    this.hideInput();

    /**
     * The handler for click event on the impersonator
     * 
     * @param {Event} event clickEvent
     */
    this.impersonatorClick = function (event) {
        event.stopPropagation(); //we only want one propegation upwards, since we create an event on the input we dont want it here.
        if (!event.pluginMade) {
            //send click event
            var event = new MouseEvent("click", { bubbles: true });
            event.pluginMade = true;
            //dispatching event will toggle the checkbox.
            //We can't do it manually since we set a getter;setter; which hides the real value!
            input.dispatchEvent(event);
        }
        //Coming here means the state is changed.
        self.checked = !self.checked;
        if (self.checked)
            self.check();
        else
            self.uncheck();
    }

    this.impersonatorKeydown = function (ev) {
        //32 = space bar, normaly spacebar on checkbox fires mouse click event
        if (ev.keyCode == 32) {
            impersonator.dispatchEvent(new Event("click")); //Make it look like an original event
        }
    }
    this.inputClick = function (ev) {
        //console.log("click", ev);
        if (!ev.pluginMade) {
            impersonator.dispatchEvent(self.makeEvent("click"))
            //fakeBox.dispatchEvent(makeEvent("change"))
        }
    }
    this.inputChange = function (ev) {
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
    this.input.addEventListener("click", this.inputClick);
    this.input.addEventListener("change", this.inputChange);
    this.input.addEventListener("input", this.inputInput);
};
CheckboxBeauty.prototype.removeListeners = function () {
    this.impersonator.removeEventListener("click", this.impersonatorClick);
    this.impersonator.removeEventListener("keydown", this.impersonatorKeydown);
    this.input.removeEventListener("click", this.inputClick);
    this.input.removeEventListener("change", this.inputChange);
    this.input.removeEventListener("input", this.inputInput);
};


CheckboxBeauty.prototype.check = function () {
    if (!this.checked) {
        this.impersonator.className += ' checked'
    }
}
CheckboxBeauty.prototype.uncheck = function () {
    if (this.checked) {
        impersonator.className = 'checkbox'
        this.checked = false;
    }
}
CheckboxBeauty.prototype.createImpersonator = function () {
    var impersonator = document.createElement("div");
    impersonator.tabIndex = 0; //Make him tab-able
    impersonator.className = "checkbox" //add a class to css this thing
    impersonator.innerText = "x";

    return impersonator
}
CheckboxBeauty.prototype.hideInput = function () {
    this.input.style.display = "none";
}
CheckboxBeauty.prototype.unhideInput = function () {
    this.input.style.display = "block";
}
CheckboxBeauty.prototype.destroy = function () {
    this.removeListeners();
    this.impersonator.remove();
    delete this.input.checked; //delete getter;setter;
    this.unhideInput();
}