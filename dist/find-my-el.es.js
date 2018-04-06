function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function index (position, nodes) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var defaults = {
    container: window,
    axis: "both"
  };

  var opts = _objectSpread({}, defaults, {
    options: options
  });

  var x = 0;
  var y = 0;
  var index = 0;
  var containerOffset = {
    top: 0,
    left: 0
  };
  var distances = [];
  var width = opts.container === window ? window.innerWidth : opts.container.clientWidth;
  var height = opts.container === window ? window.innerHeight : opts.container.clientHeight;

  if (opts.container !== window) {
    var containerRect = opts.container.getBoundingClientRect();
    containerOffset.left = containerRect.left + document.body.scrollLeft;
    containerOffset.top = containerRect.top + document.body.scrollTop;
  }

  if (position.constructor === Array) {
    if (position[0] < 0 || position[1] < 0) {
      throw new Error("Coordinates cannot be negative values");
    }

    x = position[0];
    y = position[1];
  } else if (typeof position === "string") {
    switch (position) {
      case "CENTER":
        x = width / 2;
        y = height / 2;
        break;

      case "LEFT_TOP":
        x = 0;
        y = 0;
        break;

      case "RIGHT_TOP":
        x = width;
        y = 0;
        break;

      case "CENTER_TOP":
        x = width / 2;
        y = 0;
        break;

      case "LEFT_CENTER":
        x = 0;
        y = height / 2;
        break;

      case "LEFT_BOTTOM":
        x = 0;
        y = height;
        break;

      case "RIGHT_BOTTOM":
        x = width;
        y = height;
        break;

      case "CENTER_BOTTOM":
        x = width / 2;
        y = height;
        break;

      case "RIGHT_CENTER":
        x = width;
        y = height / 2;
        break;

      default:
        x = width / 2;
        y = height / 2;
    }
  } else {
    throw new Error("Invalid position");
  }

  _toConsumableArray(nodes).forEach(function (el) {
    var distance = 0;
    var boundingRect = el.getBoundingClientRect();
    var offset = {
      left: boundingRect.left + boundingRect.width / 2 + (opts.container === window ? document.body.scrollLeft : -containerOffset.left),
      top: boundingRect.top + boundingRect.height / 2 + (opts.container === window ? document.body.scrollTop : -containerOffset.top)
    };

    if (opts.axis.toLowerCase() === "x") {
      distance = Math.pow(offset.left - x, 2);
    } else if (opts.axis.toLowerCase() === "y") {
      distance = Math.pow(offset.top - y, 2);
    } else {
      distance = Math.pow(offset.left - x, 2) + Math.pow(offset.top - y, 2);
    }

    distances.push(distance);
  });

  index = distances.indexOf(Math.min.apply(Math, distances));
  return nodes[index];
}

export default index;
