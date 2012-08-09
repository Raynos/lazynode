var boot = require("boot")
    , mdm = boot("/boot")
    , rack = require("hat").rack(128, 16, 16)
    , lazynode = require("../..")

var remote = lazynode.connect({
        createStream: createStream
        , methods: ["time"]
    })

setInterval(function () {
    remote.time(function (time) {
        console.log("time = ", time)
    })
}, 1000)

function createStream() {
    return mdm.createStream(rack())
}