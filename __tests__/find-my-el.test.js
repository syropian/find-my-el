const findMyEl = require("../src").default

const WINDOW_WIDTH = 1024
const WINDOW_HEIGHT = 768

const qs = s => document.querySelector(s)
const qsa = s => document.querySelectorAll(s)

const createMockEl = (klass, styles) => {
  const div = document.createElement("div")
  const sharedCSS = {
    background: "#5dc1a4",
    position: "absolute",
    width: "50px",
    height: "50px"
  }
  Object.assign(div.style, styles)
  div.classList.add("el", klass)

  let { top = 0, right = 0, bottom = 0, left = 0 } = styles
  top = parseInt(top, 10)
  right = parseInt(right, 10)
  bottom = parseInt(bottom, 10)
  left = parseInt(left, 10)

  if (!top) {
    top = WINDOW_HEIGHT - (50 - bottom)
  }

  if (!right) {
    right = 50 + left
  }

  if (!bottom) {
    bottom = 50 + top
  }

  if (!left) {
    left = WINDOW_WIDTH - (50 - right)
  }

  div.getBoundingClientRect = () => ({
    top,
    right,
    bottom,
    left,
    width: 50,
    height: 50
  })
  return div
}

beforeAll(function() {
  ;[document.documentElement, document.body].forEach($el => {
    Object.assign($el.style, {
      position: "relative",
      width: `${WINDOW_WIDTH}px`,
      height: `${WINDOW_HEIGHT}px`,
      minHeight: "100vh"
    })
  })

  var $first = createMockEl("first", { top: "20px", left: "20px" })
  var $second = createMockEl("second", { top: "20px", right: "20px" })
  var $third = createMockEl("third", { bottom: "20px", left: "20px" })
  var $fourth = createMockEl("fourth", { bottom: "20px", right: "20px" })
  var $fifth = createMockEl("fifth", { top: `${WINDOW_HEIGHT / 2 - 25}px`, left: `${WINDOW_WIDTH / 2 - 25}px` })

  document.body.appendChild($first)
  document.body.appendChild($second)
  document.body.appendChild($third)
  document.body.appendChild($fourth)
  document.body.appendChild($fifth)
})
describe("find-my-el", function() {
  it("finds the correct element at various positions", function() {
    var $els = qsa(".el")
    expect(findMyEl("LEFT_TOP", $els).matches(".first")).toBe(true)
    expect(findMyEl("RIGHT_TOP", $els).matches(".second")).toBe(true)
    expect(findMyEl("LEFT_BOTTOM", $els).matches(".third")).toBe(true)
    expect(findMyEl("RIGHT_BOTTOM", $els).matches(".fourth")).toBe(true)
    expect(findMyEl("CENTER", $els).matches(".fifth")).toBe(true)
  })
  it("accepts an array with x and y coordinates", function() {
    var $els = qsa(".el")
    expect(findMyEl([window.innerWidth / 2, window.innerHeight / 2], $els).matches(".fifth")).toBe(true)
  })
  it("does not accept negative values when passing an array", function() {
    var $els = qsa(".el")
    expect(() => {
      findMyEl([-1, -1], $els)
    }).toThrow()
  })
  it("accepts an array or a string as the position arg, but no other data type", function() {
    const $els = qsa(".el")

    expect(() => {
      findMyEl([50, 50], $els)
    }).not.toThrow()
    expect(() => {
      findMyEl("CENTER", $els)
    }).not.toThrow()
    expect(() => {
      findMyEl({ foo: "bar" }, $els)
    }).toThrow()
    expect(() => {
      findMyEl(10, $els)
    }).toThrow()
  })
})
