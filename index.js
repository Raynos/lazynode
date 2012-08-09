var upnode = require("upnode")
    , through = require("through")
    , es = require("event-stream")
    , slice = Array.prototype.slice

lazynode.listen = upnode.listen
lazynode.connect = lazynodeConnect

module.exports = lazynode

function lazynode() {
    var client = upnode.apply(null, arguments)
        , read = through()
        , write = through()
        , self = es.duplex(write, read)

    write.pipe(client).pipe(read)

    self.connect = connect
    self.listen = client.listen

    return self

    function connect(options) {
        var up = client.connect.apply(null, arguments)
            , methods = options.methods

        return methods.reduce(addMethod, {})

        function addMethod(acc, methodName) {
            acc[methodName] = getUp
            return acc

            function getUp() {
                var args = slice.call(arguments)
                up(callMethod)

                function callMethod(remote) {
                    remote[methodName].apply(remote, args)
                }
            }
        }
    }
}

function lazynodeConnect() {
    return lazynode({}).connect.apply(null, arguments)
}