'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function closestElementTo(position, nodes) {
  var x = 0;
  var y = 0;
  var index = 0;
  var distances = [];
  if (position.constructor === Array) {
    if (position[0] < 0 || position[1] < 0) {
      throw new Error('Coordinates cannot be negative values');
    }
    x = position[0];
    y = position[1];
  } else if (typeof position === 'string') {
    switch (position) {
      case 'CENTER':
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
        break;
      case 'LEFT_TOP':
        x = 0;
        y = 0;
        break;
      case 'RIGHT_TOP':
        x = window.innerWidth;
        y = 0;
        break;
      case 'CENTER_TOP':
        x = window.innerWidth / 2;
        y = 0;
        break;
      case 'LEFT_CENTER':
        x = 0;
        y = window.innerHeight / 2;
        break;
      case 'LEFT_BOTTOM':
        x = 0;
        y = window.innerHeight;
        break;
      case 'RIGHT_BOTTOM':
        x = window.innerWidth;
        y = window.innerHeight;
        break;
      case 'CENTER_BOTTOM':
        x = window.innerWidth / 2;
        y = window.innerHeight;
        break;
      case 'RIGHT_CENTER':
        x = window.innerWidth;
        y = window.innerHeight / 2;
        break;
      default:
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
    }
  } else {
    throw new Error('Invalid position');
  }
  [].concat(toConsumableArray(nodes)).forEach(function (el) {
    var boundingRect = el.getBoundingClientRect();
    var offset = {
      top: boundingRect.top + document.body.scrollTop,
      left: boundingRect.left + document.body.scrollLeft
    };
    var distance = Math.pow(offset.left - x, 2) + Math.pow(offset.top - y, 2);
    distances.push(distance);
  });

  index = distances.indexOf(Math.min.apply(Math, distances));

  return nodes[index];
}

module.exports = closestElementTo;
