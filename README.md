# Unbox
A super simple JavaScript loader

How to use:

**Create an instance of Unbox**
```javascript
const Unbox = new Unbox;
```

**Load a script**
```javascript
Unbox.require('/js/quill.js', _ => {

  if (Quill instanceof Object) {

    quill = new Quill(document.getElementById('quill');

  }

});
```
You can use require multiple times with the same source, and it'll resolve the callbacks when the script is loaded

**Load one or more scripts when the browser is idle**
```javascript
Unbox.lazyRequire('/js/quill.js');
```

```javascript
Unbox.lazyRequire([

  '/js/monaco/min/vs/loader.js',
  '/js/quill.js'

]);
```

**Check if one or more script is loaded**
```javascript
Unbox.loaded('/js/quill.js');
```

```javascript
Unbox.loaded([

  '/js/monaco/min/vs/loader.js',
  '/js/quill.js'

]);
```
