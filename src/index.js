export default function closestElementTo(position, nodes) {
    let x = 0
    let y = 0
    let index = 0
    const distances = []
    if (position.constructor === Array) {
        if (coordinates[0] < 0 || coordinates[1] < 0) {
          throw new Error('Coordinates cannot be negative values');
        }
        x = coordinates[0]
        y = coordinates[1]
    } else if (typeof position === 'string') {
      switch (position) {
        case 'CENTER':
          x = window.innerWidth / 2
          y = window.innerHeight / 2
          break;
        case 'LEFT_TOP':
          x = 0
          y = 0
          break;
        case 'RIGHT_TOP':
          x = window.innerWidth
          y = 0
          break;
        case 'CENTER_TOP':
          x = window.innerWidth / 2
          y = 0
          break;
        case 'LEFT_CENTER':
          x = 0
          y = window.innerHeight / 2
          break;
        case 'LEFT_BOTTOM':
          x = 0
          y = window.innerHeight
          break;
        case 'RIGHT_BOTTOM':
          x = window.innerWidth
          y = window.innerHeight
          break;
        case 'CENTER_BOTTOM':
          x = window.innerWidth / 2
          y = window.innerHeight
          break;
        case 'RIGHT_CENTER':
          x = window.innerWidth
          y = window.innerHeight / 2
          break;
        default:
          x = window.innerWidth / 2
          y = window.innerHeight / 2
      }
    } else {
      throw new Error('Invalid position');
    }
    [...nodes].forEach(function(el) {
      const boundingRect = el.getBoundingClientRect()
      const offset = {
        top: boundingRect.top + document.body.scrollTop,
        left: boundingRect.left + document.body.scrollLeft,
      }
      const distance = Math.pow((offset.left - x), 2) + Math.pow((offset.top - y), 2)
      distances.push(distance)
    })

    index = distances.indexOf(Math.min.apply(Math, distances));

    return nodes[index]
}
