import jQuery from "jquery"
import findMyEl from "../src"

window.$ = jQuery

const WINDOW_WIDTH = 1024
const WINDOW_HEIGHT = 768

const createMockEl = (klass, styles) => {
  const sharedCSS = {
    background: "#5dc1a4",
    position: "absolute",
    width: "50px",
    height: "50px"
  }
  const div = document.createElement("div")
  div.classList.add("el", klass)
  Object.assign(div.style, styles)
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
  $("html, body").css({
    position: "relative",
    width: `${WINDOW_WIDTH}px`,
    height: `${WINDOW_HEIGHT}px`,
    minHeight: "100vh"
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
    var $els = document.querySelectorAll(".el")
    expect(findMyEl("LEFT_TOP", $els).classList.contains("first")).toBe(true)
    expect(findMyEl("RIGHT_TOP", $els).classList.contains("second")).toBe(true)
    expect(findMyEl("LEFT_BOTTOM", $els).classList.contains("third")).toBe(true)
    expect(findMyEl("RIGHT_BOTTOM", $els).classList.contains("fourth")).toBe(true)
    expect(findMyEl("CENTER", $els).classList.contains("fifth")).toBe(true)
  })
  it("accepts an array with x and y coordinates", function() {
    var $els = document.querySelectorAll(".el")
    expect(findMyEl([window.innerWidth / 2, window.innerHeight / 2], $els).classList.contains("fifth")).toBe(true)
  })
  it("does not accept negative values when passing an array", function() {
    var $els = document.querySelectorAll(".el")
    expect(() => {
      findMyEl([-1, -1], $els)
    }).toThrow()
  })
  it("accepts an array or a string as the position arg, but no other data type", function() {
    const $els = document.querySelectorAll(".el")

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
