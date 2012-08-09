var lazynode = require("../..")

lazynode({
    time: function (cb) {
        cb(new Date().toString())
    }
}).listen(8642)