export default function findMyEl(position, nodes, options = {}) {
  const defaults = {
    container: window,
    axis: "both"
  }
  const opts = Object.assign({}, defaults, options);

  let x = 0
  let y = 0
  let index = 0
  const containerOffset = {
    top: 0,
    left: 0
  }
  const distances = []
  const width = opts.container === window ? window.innerWidth : opts.container.clientWidth
  const height = opts.container === window ? window.innerHeight : opts.container.clientHeight

  if (opts.container !== window) {
    const containerRect = opts.container.getBoundingClientRect()
    containerOffset.left = containerRect.left + document.body.scrollLeft
    containerOffset.top = containerRect.top + document.body.scrollTop
  }

  if (position.constructor === Array) {
    if (position[0] < 0 || position[1] < 0) {
      throw new Error('Coordinates cannot be negative values');
    }
    x = position[0]
    y = position[1]
  } else if (typeof position === 'string') {
    switch (position) {
      case 'CENTER':
        x = width / 2
        y = height / 2
        break;
      case 'LEFT_TOP':
        x = 0
        y = 0
        break;
      case 'RIGHT_TOP':
        x = width
        y = 0
        break;
      case 'CENTER_TOP':
        x = width / 2
        y = 0
        break;
      case 'LEFT_CENTER':
        x = 0
        y = height / 2
        break;
      case 'LEFT_BOTTOM':
        x = 0
        y = height
        break;
      case 'RIGHT_BOTTOM':
        x = width
        y = height
        break;
      case 'CENTER_BOTTOM':
        x = width / 2
        y = height
        break;
      case 'RIGHT_CENTER':
        x = width
        y = height / 2
        break;
      default:
        x = width / 2
        y = height / 2
    }
  } else {
    throw new Error('Invalid position');
  }
  [...nodes].forEach(function(el) {
    let distance = 0
    const boundingRect = el.getBoundingClientRect()
    const offset = {
      left: (boundingRect.left + (el.clientWidth / 2)) + (opts.container === window ? document.body.scrollLeft : -containerOffset.left),
      top: (boundingRect.top + (el.clientHeight / 2)) + (opts.container === window ? document.body.scrollTop : -containerOffset.top),
    }
    if (opts.axis.toLowerCase() === "x") {
      distance = Math.pow((offset.left - x), 2)
    } else if (opts.axis.toLowerCase() === "y") {
      distance = Math.pow((offset.top - y), 2)
    } else {
      distance = Math.pow((offset.left - x), 2) + Math.pow((offset.top - y), 2)
    }
    distances.push(distance)
  })

  index = distances.indexOf(Math.min.apply(Math, distances));

  return nodes[index]
}
