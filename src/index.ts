type PositionString = "CENTER" | "LEFT_TOP" | "RIGHT_TOP" | "CENTER_TOP" | "LEFT_CENTER" | "LEFT_BOTTOM" | "RIGHT_BOTTOM" | "CENTER_BOTTOM" | "RIGHT_CENTER"
type AxisString = "x" | "y" | "both"
type ContainerPosition = [number, number] | PositionString

interface IOptions {
  container?: Node | Element | HTMLElement | Window,
  axis?: AxisString
}

interface IContainerOffset {
  top: number,
  left: number
}

export default function(position: ContainerPosition, nodes: NodeList, options: IOptions): Node {
  const defaults: IOptions = {
    container: window,
    axis: "both"
  }
  const opts = { ...defaults, options }

  let x: number = 0
  let y: number = 0
  let index: number = 0

  const containerOffset: IContainerOffset = {
    top: 0,
    left: 0
  }

  const distances: number[] = []

  const width: number = opts.container === window ? window.innerWidth : (opts.container as Element).clientWidth
  const height: number = opts.container === window ? window.innerHeight : (opts.container as Element).clientHeight

  if (opts.container !== window) {
    const containerRect = (opts.container as Element).getBoundingClientRect()

    containerOffset.left = containerRect.left + document.body.scrollLeft
    containerOffset.top = containerRect.top + document.body.scrollTop
  }

  if (position.constructor === Array) {
    if (position[0] < 0 || position[1] < 0) {
      throw new Error("Coordinates cannot be negative values")
    }
    x = (position[0] as number)
    y = (position[1] as number)
  } else if (typeof position === "string") {
    switch (position) {
      case "CENTER":
        x = width / 2
        y = height / 2
        break
      case "LEFT_TOP":
        x = 0
        y = 0
        break
      case "RIGHT_TOP":
        x = width
        y = 0
        break
      case "CENTER_TOP":
        x = width / 2
        y = 0
        break
      case "LEFT_CENTER":
        x = 0
        y = height / 2
        break
      case "LEFT_BOTTOM":
        x = 0
        y = height
        break
      case "RIGHT_BOTTOM":
        x = width
        y = height
        break
      case "CENTER_BOTTOM":
        x = width / 2
        y = height
        break
      case "RIGHT_CENTER":
        x = width
        y = height / 2
        break
      default:
        x = width / 2
        y = height / 2
    }
  } else {
    throw new Error("Invalid position")
  }
  nodes.forEach((el: Node) => {
    let distance = 0
    const boundingRect = (el as Element).getBoundingClientRect()
    const offset = {
      left:
        boundingRect.left +
        boundingRect.width / 2 +
        (opts.container === window ? document.body.scrollLeft : -containerOffset.left),
      top:
        boundingRect.top +
        boundingRect.height / 2 +
        (opts.container === window ? document.body.scrollTop : -containerOffset.top)
    }
    if (opts.axis.toLowerCase() === "x") {
      distance = Math.pow(offset.left - x, 2)
    } else if (opts.axis.toLowerCase() === "y") {
      distance = Math.pow(offset.top - y, 2)
    } else {
      distance = Math.pow(offset.left - x, 2) + Math.pow(offset.top - y, 2)
    }
    distances.push(distance)
  })

  index = distances.indexOf(Math.min.apply(Math, distances))

  return nodes[index]
}
