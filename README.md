# checkbox-beautifier
*A checkbox beautifier that does not kill your other libraries code.*

## Goal

The goal is to deliver:
1. a small and lightweight
2. and through object oriented programming extensive library
3. that makes it easily for you to beautify your checkboxes (and radio buttons in the future)
4. and that does not kill your existing code!

point 4 meaning, that all right events are still fired but also interpreted in the right way.

Even if your code does something like: `input.checkbox = true;` my plugun should still work. 
Using a [definedProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) on `input.checked` makes it work. but also makes me go through some hoops to make it work correctly, since the real value is now hidden and inaccessable.  


## How it works.

1. you download my script from github (not yet added to bower since it's still beta) and add it to your code.
2. Get your vanilla javascript checkbox element
3. Execute the following `new CheckboxBeauty([your vanilla js-element]);`

It's vanilla javascript (no libraries used) so this script has no dependencies! Ain't that jolly.

## Roadmap

1. Cleaning up script.js
2. Creating src files for this script as a js plugin and/or require.js defines
3. Create a build script to minify and bundle base + jquery
4. disabled - readonly options
5. Make it work for radiobuttons
6. Performance testing to test contributions


## Contribute

Contributions are very welcome. You can fork and make a pull request. Please first add the additional tests for the thing you are making, to speed up the process.

This library has no amibtions to become an all in one library with thousand functionalities. it's single functionality is to create an object oriented checkbox beautifier.
You can extend the object as you please using [inheritance](https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) or use the decorator pattern.

There will be in the near future some sort of option structure to make extending this object a bit easier.