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
