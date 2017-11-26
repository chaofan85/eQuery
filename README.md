# eQuery

[DEMO](http://www.chaofan.live/eQuery/)

Desktop Widget is a web application which allows user to create todo list, check weather and update other daily schedules.

eQuery is a lightweight JavaScript library for traversing and manipulating the DOM on the webpage, handling events and making AJAX requests. It is written in vanilla JavaScript.

## How to use

This library includes two files: `lib/main.js` and `lib/dom_node_collection.js`. To use the library, user needs to download these two files and put in the same folder under the project directory.

Any .js file which uses the methods from eQuery should `import` the library. If user is using `webpack`, add following statement at the top of the file:

```js
  import $e from './pathname/main.js';
```

## Features of eQuery

The main features of the library are:

* DOM Manipulation and Traversal.
* Event Handling
* AJAX request


## eQuery Methods

* selector `$e`

  eQuery allows user to use `$e` selector to select either a single HTMLElement or a string with a CSS selector and use other functions to manipulate these elements.

  For example, to select a `div` which has a class name `date`, use `$e('div .date')` to select this element.

* `html()`

  If the method doesn't receive a string as argument, if will return the `innerHTML` of the selected element, otherwise it will over write the `innerHTML` the content of the selected element with the string argument.

  For example, to get the content of the `div` element, use the following method:

  ```js
  const content = $e('div').html();
  ```

  To overwrite the content of the `div` element, use the following method:

  ```js
  $e('div').html('<p>Overwrite</p>');
  ```


* `append()`

  This method accepts either a eQuery wrapped collection, an HTML element, or a string. Append the `outerHTML` of each element in the argument to the `innerHTML` of each element in the `DOMNodeCollection`.

  For example, to append a `li` to the `ul`, use the following method:

  ```js
  $e('ul').append('<li>appended</li>');
  ```


* `empty()`

  This method clears out the content of all nodes in the internal array.

  For example, to remove the content of the `p` element, use the following method:

  ```js
  $e('p').empty();
  ```

* `children()`

  `children()` method returns a DOMNodeCollection of all children of all nodes in the array.

  For example, to get the all children elements in `ol` element, use following method:

  ```js
  $e('ol').children();
  ```

* `parent()`

  Return a DOMNodeCollection of the parents of each of the nodes.

  For example, to return the `li` element's parent element, use the following method:

  ```js
  $e('li').parent();
  ```

* `find()`

  Returns a DOMNodeCollection of all the nodes matching the selector passed in as an argument that are descendants of the nodes.

  For example, to find all `p` elements in the `div` element, use the following method:

  ```js
  $e('div').find('p');
  ```
* `remove()`

  This method removes the html of all the nodes in the array from the DOM, and it also removes all nodes from the array.

  For example, to remove all the nodes in the `div` element, use the following method:

  ```js
  $e('div').remove();
  ```

* `on()`

  `on` methods attaches an event handler function to the selected elements, and `off` method cancels that event.

    For example, to trigger `click` event, user following code:

    ```js
    $e('div').on("click", function() {
      console.log('clicked!');
    });
    ```

* `$e(callback)`

   Callback function will be executed when the HTML has finished rendering.

   For example:

   ```js
   $( () => alert('the document is ready'));
   ```

* `$e.ajax()`

  `$e.ajax` method makes AJAX request, the default HTTP method is `GET`. The method receives `url`, `method` and `data` as arguments.

  ```js
  $e.ajax({
    url: 'some url',
    method: 'GET',
    dataType: 'json',
    success() {
      //some callback
    },
    error() {
      //some callback
    }
  });
  ```
