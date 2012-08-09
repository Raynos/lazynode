var upnode = require("upnode")
    , through = require("through")

lazynode.listen = upnode.listen
lazynode.connect = lazynodeConnect

module.exports = lazynode

function lazynode() {
    var client = upnode.apply(null, arguments)
        , self = through()

    client.pipe(self, {
        end: false
    }).pipe(client, {
        end: false
    })

    self.connect = connect
    self.listen = client.listen

    return self

    function connect(options) {
        var up = client.connect.apply(null, arguments)
            , methods = options.methods

        return methods.reduce(addMethod, {})

        function addMethod(remote, methodName) {
            remote[methodName] = getUp
            return remote

            function getUp() {
                var args = arguments
                up(callMethod)

                function callMethod(remote) {
                    remote[methodName].apply(null, args)
                }
            }
        }
    }
}

function lazynodeConnect() {
    return lazynode({}).connect.apply(null, arguments)
}