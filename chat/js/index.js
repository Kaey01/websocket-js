;((doc, Socket, storage, location) => {

    const oList = doc.querySelector('#list')
    const oMsg = doc.querySelector('#message')
    const oSendBtn = doc.querySelector('#send')
    const ws = new Socket('ws:localhost:8000')
    let username = ''

    const init = () => {
        bindEvent()
    }

    function bindEvent () {
        oSendBtn.addEventListener('click',handleSendBtnClick, false)
        ws.addEventListener('open', handleOpen, false)
        ws.addEventListener('close', handleClose, false)
        ws.addEventListener('error', handleError, false)
        ws.addEventListener('message', handleMessage, false)
    }

    function handleSendBtnClick(e) {
        const msg = oMsg.value

        if (!msg.trim().length) {
            return
        }

        ws.send(JSON.stringify({
            user: username,
            dateTime: new Date().getTime(),
            message: msg
        }))

        oMsg.value = ''
    }

    function handleOpen (e) {
        console.log('websocket open',e);
        username = storage.getItem('username')

        if (!username) {
            location.href = 'entry.html'
            return
        }
    }

    function handleClose (e) {
        console.log('websocket close',e);
    }

    function handleError (e) {
        console.log('websocket erroe',e);
    }

    function handleMessage (e) {
        console.log('websocket message');
        const msgData = JSON.parse(e.data)
        oList.appendChild(createMsg(msgData))
    }

    function createMsg (data) {
        const { user, dataTime, message } = data
        const oItem = doc.createElement('li')
        oItem.innerHTML = `
            <p>
                <span> ${ user }</span>
                <i>${ new Date(dataTime) }</i>
                <p>消息： ${ message }</p>
            </p>
        `

        return oItem
    }

    init()

})(document, WebSocket, localStorage, location);