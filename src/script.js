/**
 * @description a function to beautify your checkbox element but keep all your events working correctly
 * @param  {HTMLElement} checkElement
 */
var CheckboxBeauty = function (checkElement) {
    /** @type {HTMLElement} */
    if(checkElement.type !== 'checkbox')
        throw new Error('CheckboxBeauty can only beautify a checkbox')
    this.input = checkElement;
    const input = checkElement;    
    
    this.checked = input.checked;
    
    var fakeBox = document.createElement("div");
    var checked = input.checked;
    fakeBox.className = "checkbox"
    fakeBox.tabIndex = 0;
    if(checked)
        fakeBox.className += " checked";
    input.parentNode.insertBefore(fakeBox, input.nextSibling)
    fakeBox.innerText = "x";
    //el.style = "display:none;";
    var makeEvent = function (name) {
        var ev = new Event(name);
        ev.pluginMade = true;
        return ev;
    }
    
    fakeBox.addEventListener("click",function (ev) {
        if(!ev.pluginMade)
            input.checked = !input.checked;
            checked = input.checked;
        if(checked)
            fakeBox.className += ' checked'
        else 
            fakeBox.className = 'checkbox'
        
        if(!ev.pluginMade){
            input.dispatchEvent(makeEvent("click"));
            input.dispatchEvent(makeEvent("change"));
        }
        
    });
    
    fakeBox.addEventListener("keydown",function (ev) {
        //32 = space bar, normaly spacebar on checkbox fires mouse click event
       if (ev.keyCode == 32) {
           fakeBox.dispatchEvent(new Event("click"));
       } 
    });
    
    input.addEventListener("click", function (ev) {
        console.log("click",ev);
        if(!ev.pluginMade){
            fakeBox.dispatchEvent(makeEvent("click"))
            //fakeBox.dispatchEvent(makeEvent("change"))
            
        }
    });
    
    input.addEventListener("change", function (ev) {
        console.log("change",input.checked);
    });
    
    input.addEventListener("input", function (ev) {
        console.log("input",input.checked);
    });
    
    
}
