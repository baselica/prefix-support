PrefixSupport
==============

Small class to help doing - in particular - CSS-animations triggered from JavaScript.

Usage
-----

Create a new instance:

```javascript
var prefix = new PrefixSupport()
```

#### Vendor
To get your current vendor:

```javascript
prefix.getVendor();
```

Will return one of the following:
* `false` indicates that the browser doesn't support transitions
* `Ms` means trusty old - or rather new in this case - IE
* `O` means you're sort of a hipster using Opera
* `Moz` means a browser actually implementing standards - Firefox
* `WebKit` - so either your a Mac fanboy on Safari or your getting spied on by Google using Chrome
* `Khtml` - Konqueror - you probably smell funky

#### Get a property

To get a property (for instance transform) for the current browser you call:

```javascript
prefix.getProperty('transform');
```

This will return the prefixed form for the property, ie `WebkitTransform`

#### Get the transition callback name

Due to no-one following the specifications, except for - drumroll - Firefox, for working with transition callbacks you can use the helper `getTransitionCallback`.

```javascript
var transitionCallback = prefix.getTransitionCallback();
element.addEventListener(transitionCallback, function(e) {
  console.log('Wow, my animation finished!');
}, false);
```

#### Css property name

In some cases you might want the CSS-representation of an property as opposed to the JS-representation. This is covered by using `getCssProp`

```javascript
prefix.getCssProp('transform');
```

Which will return something like `-web-kit-transform`
