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