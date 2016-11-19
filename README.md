# find-my-el [![Build Status](https://travis-ci.org/syropian/find-my-el.svg?branch=master)](https://travis-ci.org/syropian/find-my-el)

> Locates the DOM element closest to a given set of coordinates

## Install

```
$ yarn add find-my-el
```

or

```
npm install find-my-el --save
```

### UMD Build

https://unpkg.com/find-my-el

## Usage

```
import findMyEl from 'find-my-el'

const nodes = document.querySelectorAll('.item')
findMyEl('CENTER', nodes)

// or
const x = window.innerWidth / 2
const y = window.innerHeight / 2
findMyEl([x, y], nodes)
```
## API

### findMyEl(position, nodes, [options])

#### position
Type: `string` or `array`
The coordinates to check against. You may use the [position keywords](#position-keywords), or pass an array of `[x, y]` coordinates.

#### nodes
Type: `NodeList`
The collection of nodes to check.

#### options

##### container
Type: `Element`
Default: `window`

Restricts the surface area of the check to the container bounds.

##### axis
Type: `string`
Default: `both`

Allows you to limit which axis to check. Accepts `x`, `y`, or `both`.


### Position Keywords

There are various keywords you can use as a shorthand for various positions. They follow the convention of `X_Y`. Eg. `LEFT_CENTER` would refer to an `x` coordinate of `0` and a `y` coordinate of half the window height.

**Keywords**:
- `CENTER`
- `LEFT_TOP`
- `RIGHT_TOP`
- `CENTER_TOP`
- `LEFT_CENTER`
- `RIGHT_CENTER`
- `LEFT_BOTTOM`
- `RIGHT_BOTTOM`
- `CENTER_BOTTOM`

## How is this different from `document.getElementAtPoint`?

`find-my-el` has some key differences that sets it apart from the native `document.getElementAtPoint` function. The first is it lets you restrict your search to a specific list of DOM nodes. This lets you avoid issues such as a resulting node ending up being a parent element instead of a child node that you're trying to target. The other difference is `find-my-el` looks for the _closest_ element to the coordinates — even if it's not actually touching them. You can also pass in a custom container to restrict the bounds of your search, instead of checking the entire viewport.   
