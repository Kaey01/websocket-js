const Ws = require('ws')

;((Ws) => {
    //ws:localhost:8000
    const server = new Ws.Server({ port: 8000 })

    const init = () => {
        bindEvent()
    }

    function bindEvent () {
        server.on('open',handleOpen)
        server.on('close',handleClose)
        server.on('error',handleError)
        server.on('connection',handleConnection)
    }

    function handleOpen () {
        console.log('WebSocket open');
    }

    function handleClose () {
        console.log('WebSocket close');
    }

    function handleError () {
        console.log('WebSocket error');
    }

    function handleConnection (ws) {
        ws.on('message', handleMessage)
        console.log('WebSocket connected');
    }

    function handleMessage (msg) {
        // console.log(msg.toString());
        server.clients.forEach(function(c) {
            c.send(msg.toString())
        })
    }

    init()
})(Ws);