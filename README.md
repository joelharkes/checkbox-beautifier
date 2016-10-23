# checkbox (radio button) beautifier

This is a helper and library repository for you to help you style your checkboxes and radio buttons.

They can be hard to style properly and the most used method is to use a jquery library for this. But pure html + css
will actually do. This repository provides examples and styles you can use to your own benefit. (also a small javascript
library will be included to help you with already defined html pages).

For the sake of sharing experience I added a chapter of history. Please read if you'd like to learn the origings of this
repository, otherwise you can just skip it. and go the the explanation.

##history 
I've tried to create the perfect javascript plugin (as you can see in the history of the commits).
This plugin you would be able to install to beautify your checkbox and radio buttons but not break your code.
Meaning: all the right events would still be fired of on the right elements. I used override properties 
(js: defire property) to hijack the checked property on the input element to even make the plugin work if someone
manualy set this to true (instead of fireing a click mehtod). It all worked great until I was trying to incorporate
 the feature of labels and there events. This was were i totally got stuck. The label was somehow firing two events 
 (one on the label and one on the input element) which i wasn't able to fake anymore (at least not very easily).

This let met to more research and stumbled on some great sources under which my credits go out to:

* [Jan Turon on stackoverflow](http://stackoverflow.com/a/32876109/1275832)
* [web tuts](https://webdesign.tutsplus.com/articles/quick-tip-easy-css3-checkboxes-and-radio-buttons--webdesign-8953)

They provided a pure css way to style your input check/radio buttons. having experience from the past using javascript checkboxes
plugins, knows that it would very easily slow the page down (at about a hundred checkboxes on a page).
which would massively slow down page rendering, using pure css would probably give me the best performance.

The only con of using this technique/method is that your input elements should always be **inside** the label elements, 
and have some other extra element inside to fake as an input element (i like to use the i tag). so your html will always
have to look something like `label i+input`. (label does not need to be the direct parent, but most of the time you will 
end up with `label > i + input` or `label > span + input`. 


## Explanation

The idea is simple: since we can't style an radio/checkbox input element properly we put another element in its place.
The problem would be that click and change evens would not fire and that this element wouldn't be submitted with the form.
Thats why we keep an input element as backing field. We simply hide this element and wrap the representative element inside 
a label that links to the input field. the label has the great future of sending its click events through to the checkbox it
belongs to.

The advantages of this method is that all your original javascript code still works! only a small changes in html code are required.

The code could look like:

```
<input type="checkbox" id="id" />
<label for="id">
  <i><i/> Label text
</label>
```

(The `i` element could be a glypicon or fontawesome icon or your own styled css to represent the input element.)


But: for this method you would have to make sure the id elements are linked properly. (you can't reuse id because it would 
always target the first input element it finds with this id).

The better solution would be:

```
<label for="id">
  <input type="checkbox" id="id" />
  <i><i/> Label text
</label>
```

I would still advice to use id's because its seen as good practise, but its not necessary. also this way everything
is contained in element, which will make your styling be more contained. you could place a `class` on the `label` the specify
which checkbox need to be beautified and which not.

## List of examples

* fontawesome icons + less styling: [demo](http://htmlpreview.github.io/?https://github.com/joelharkes/checkbox-beautifier/blob/master/test/fontawesome.html) - [source](https://github.com/joelharkes/checkbox-beautifier/blob/master/src/fontawesome.less)


## Contribute

You can Contribute by adding issues, or fixing the issues yourself. This is done by:

1. forking the repo.
2. Checkout locally
3. making some changes
4. push the changes to your fork.
5. On the github website create a pull request from your fork.

To test your changes, some demos might use nodejs to compile less code. to run this:

1. install Node js
2. install the necesarry packages: run `npm install` command in this directory
3. install gulp globally: `npm install -g gulp-cli`
4. either: run `gulp` command to build, or run `gulp watch` ones to build on change.

I'll do my best to maintain this repo properly.