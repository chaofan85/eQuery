const DOMNodeCollection = require('./dom_node_collection.js');
const callbacks = [];
let ready = false;

export const $e = (arg) => {
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

export default $e;
