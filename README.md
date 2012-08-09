# lazynode

lazily call an upnode server

Creates a lazy object where each method calls up and then calls the method on the remote.

## Example Server

``` js
var lazynode = require("..")

lazynode({
    time: function (cb) {
        cb(new Date().toString())
    }
}).listen(8642)
```

## Example Client

``` js
var lazynode = require("..")

var remote = lazynode.connect({
    port: 8642
    , methods: ["time"]
})

setInterval(function () {
    remote.time(function (t) {
        console.log("time = " + t)
    })
}, 1000)
```

## Installation

`npm install lazynode`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/lazynode.png
  [2]: http://travis-ci.org/Raynos/lazynode