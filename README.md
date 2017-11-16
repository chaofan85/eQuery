# eQuery

[DEMO](http://www.chaofan.live/eQuery/)

Desktop Widget is a web application which allows user to create todo list, check weather and update other daily schedules.

eQuery is a lightweight JavaScript library for traversing and manipulating the DOM on the webpage, handling events and making AJAX requests. It is written in vanilla JavaScript.

## How to use

This library includes two files: `lib/main.js` and `lib/dom_node_collection.js`. User can use `webpack` to import the library, use `main.js` as entry file.

## Features of eQuery

The main features of the library are:

* DOM Manipulation and Traversal.

  Selector: `$e`

  This library allows user `$e` selector to select either a single HTMLElement or a string with a CSS selector and use other functions to manipulate these elements.

  For example, to select a `div` which has a class name `date`, use `$e('div .date')` to select this element.

* Event Handling
`on` methods attaches an event handler function to the selected elements, and `off` method cancels that event.

  For example, to trigger `click` event, user following code:

  ```js
  $e('div').on("click", function() {
    console.log('clicked!');
  });
  ```

* AJAX
`$e.ajax` method makes AJAX request, the default HTTP method is `GET`. The method receives `url`, `method` and `data` as arguments.

## eQuery Methods

* `html()`

  If the method doesn't receive a string as argument, if will return the `innerHTML` of the selected element, otherwise it will over write the `innerHTML` the content of the selected element with the string argument.

  ```js
  html(string) {
    if (typeof string === 'undefined') {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((el) => {
        el.innerHTML = string;
      });
    }
  }
  ```

* `empty()`

  This method clears out the content of all nodes in the internal array.

  ```js
  empty() {
    this.elements.forEach((el) => {
      el.innerHTML = "";
    });
  }
  ```

* `parent()`

  Return a DOMNodeCollection of the parents of each of the nodes

  ```js
  parent() {
    let parentNodes = [];
    this.each((node) => {
      const parentNodeList = node.parentNode;
      if (!parentNodes.includes(parentNodeList)) {
        parentNodes = parentNodes.concat(parentNodeList);
      }
    });
    return new DOMNodeCollection(parentNodes);
  }
  ```

  * `remove()`

  This method removes the html of all the nodes in the array from the DOM, and it also removes all nodes from the array.

  ```js
  remove() {
    let deleted = [];
      this.elements.forEach((el) => {
        deleted.push(el);
        el.parentNode.removeChild(el);
      });
    return new DOMNodeCollection(deleted);
  }
  ```
