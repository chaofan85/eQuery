/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
const callbacks = [];
let ready = false;

const $e = (arg) => {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === "function") {
    return registerCallback(arg);
  } else {
    const NodeList = document.querySelectorAll(arg);
    const nodeArray = Array.from(NodeList);
    return new DOMNodeCollection(nodeArray);
  }
};

$e.ajax = (options) => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $e.extend(defaults, options);
  options.method = options.method.toUpperCase();


  if (options.method === "GET") {
    options.url += `${toQueryString(options.data)}`;
  }

  request.open(options.method, options.url, true);
  request.onload = (e) => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

const toQueryString = (obj) => {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};


$e.extend = (base, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    for (const prop in obj) {
      base[prop] = obj[prop];
    }
  });
  return base;
};

function registerCallback(arg){
  if (!ready) {
    callbacks.push(arg);
  } else {
    arg();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ready = true;
  callbacks.forEach(func => func());
});

window.$e = $e;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection{
  constructor(elements) {
    this.elements = elements;
  }

  html(string) {
    if (typeof string === 'undefined') {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.elements.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(outerHTML) {
    if (this.elements.length === 0) { return; }

    if (typeof outerHTML === 'object' &&
        !(outerHTML instanceof DOMNodeCollection)) {
      outerHTML = window.$e(outerHTML);
    }

    this.elements.forEach((el) => {
      el.innerHTML += outerHTML;
    });
  }

  attr(attributeName, value) {
    if (typeof value === 'undefined') {
      return this.elements[0].getAttribute(attributeName);
    } else {
      return this.elements[0].setAttribute(attributeName, value);
    }
  }


  addClass(arg) {
    if (typeof arg === 'string') {
      const names = arg.split(" ");
      this.elements.forEach((el) => {
        names.forEach((name) => {
          el.className += ` ${name}`;
        });
      });
    } else if (typeof arg === 'function'){
      this.elements.forEach((el, index) => {
        let name = arg(index, el.className);
        el.className += ` ${name}`;
      });
    }
  }

  removeClass(arg) {
    if (typeof arg === 'string') {
      const names = arg.split(" ");
      this.elements.forEach((el) => {
        names.forEach((name) => {
          let arr = el.className.split(" ");
          arr.forEach((n, index) => {
            if (n === name) {
              arr[index] = "";
            }
          });
          el.className = arr.filter((elClassName)=>elClassName).join(" ");
        });
      });
    } else if (typeof arg === 'function'){
      this.elements.forEach((el, index) => {
        let name = arg(index, el.className);
        let arr = el.className.split(" ");
        el.className = arr.filter((elClassName)=>{
          return (elClassName !== name);
        }).join(" ");
      });
    }
  }

  children() {
    let childNodes = [];
    this.each((node) => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DOMNodeCollection(childNodes);
  }

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

  find(selector) {
    let foundNodes = [];
    let result = [];
    this.each((node) => {
      const foundNodeList = node.querySelectorAll(selector);
        foundNodes = foundNodes.concat(Array.from(foundNodeList));
      });

    foundNodes.forEach((el) => {
      if (!result.includes(el)) {
        result.push(el);
      }
    });

    return new DOMNodeCollection(result);
  }

  remove() {
    let deleted = [];
      this.elements.forEach((el) => {
        deleted.push(el);
        el.parentNode.removeChild(el);
      });
    return new DOMNodeCollection(deleted);
  }

  on(eventName, callback) {

    this.each((node) => {
      node.addEventListener(eventName, callback);
      const eventKey = `eQueryEvents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }


  off(eventName) {
    this.each((node) => {
      const eventKey = `eQueryEvents-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach((callback) => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }


  each(cb) {
    this.elements.forEach(cb);
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=eQuery.js.map