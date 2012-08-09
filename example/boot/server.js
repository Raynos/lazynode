var server = require("./http")
    , lazynode = require("../..")

var boot = require("boot")
    , methods = {
        time: function (cb) {
            cb(new Date().toString())
        }
    }

var sock = boot(streamHandler)
sock.install(server, '/boot')
console.log("sock hooked on", "/boot")

function streamHandler(stream) {
    var up = lazynode(methods)
    up.pipe(stream).pipe(up)
}