window.$ = jQuery;
describe("find-my-el", function(){
  beforeEach(function() {
    var sharedCSS = {
      background: "#5dc1a4",
      position: "absolute",
      width: "50px",
      height: "50px"
    }
    $("html, body").css({
      position: "relative",
      width: "2880px",
      height: "1800px"
    })

    var $first = $('<div />', {
      class: 'el first',
      css: Object.assign({}, sharedCSS, {
        top: "20px",
        left: "20px",
      })
    })
    var $second = $('<div />', {
      class: 'el second',
      css: Object.assign({}, sharedCSS, {
        top: "20px",
        right: "20px",
      })
    })
    var $third = $('<div />', {
      class: 'el third',
      css: Object.assign({}, sharedCSS, {
        bottom: "20px",
        left: "20px",
      })
    })
    var $fourth = $('<div />', {
      class: 'el fourth',
      css: Object.assign({}, sharedCSS, {
        bottom: "20px",
        right: "20px",
      })
    })
    var $fifth = $('<div />', {
      class: 'el fifth',
      css: Object.assign({}, sharedCSS, {
        bottom: "50%",
        left: "50%",
        marginLeft: "-100px",
        marginTop: "-100px"
      })
    })
    $(document.body).append($first).append($second).append($third).append($fourth).append($fifth);
  })

  it("finds the correct element at various positions", function() {
    var $els = document.querySelectorAll('.el')
    expect(closestElementTo('LEFT_TOP', $els).classList.contains('first')).toBe(true);
    expect(closestElementTo('RIGHT_TOP', $els).classList.contains('second')).toBe(true);
    expect(closestElementTo('LEFT_BOTTOM', $els).classList.contains('third')).toBe(true);
    expect(closestElementTo('RIGHT_BOTTOM', $els).classList.contains('fourth')).toBe(true);
    expect(closestElementTo('CENTER', $els).classList.contains('fifth')).toBe(true);
  })
  it("accepts an array with x and y coordinates", function() {
    var $els = document.querySelectorAll('.el')
    expect(closestElementTo([window.innerWidth / 2, window.innerHeight / 2], $els).classList.contains('fifth')).toBe(true);
  })
  it("does not accept negative values when passing an array", function() {
    var $els = document.querySelectorAll('.el')
    var call = function() {
      return closestElementTo([-1, -1], $els)
    }
    expect(call).toThrow()
  })
  it("accepts an array or a string as the position arg, but no other data type", function() {
    var $els = document.querySelectorAll('.el')
    var firstCall = function() {
      return closestElementTo([50, 50], $els)
    }
    var secondCall = function() {
      return closestElementTo("CENTER", $els)
    }
    var thirdCall = function() {
      return closestElementTo({foo: "bar"}, $els)
    }
    var fourthCall = function() {
      return closestElementTo(10, $els)
    }
    expect(firstCall).not.toThrow()
    expect(secondCall).not.toThrow()
    expect(thirdCall).toThrow()
    expect(fourthCall).toThrow()
  })
})
