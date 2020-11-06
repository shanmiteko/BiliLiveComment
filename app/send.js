/* 发送弹幕 */
const request_send = require('http').request;
const sendChat = (chat)=> {
    let sendchat = document.querySelector('.send #sendchat');
    const contents = stringify({
        msg: chat,
        color:16777215,
        fontsize:25,
        rnd: parseInt(Date.now()/1000),
        roomid: room,
        csrf:'e12a61f98c9dc9ae26e68ef4e472a833'
    });
    const options = {
        host: 'api.live.bilibili.com',
        path: '/msg/send',
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Content-Length': contents.length,
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://live.bilibili.com',
            'Cookie': cookie
        }
    }
    let req = request_send(options,res =>{
        res.setEncoding('utf8');
        res.on('data',data=>{
            const code = JSON.parse(data).code;
            if (code == 0) {
                sendchat.style.border = '1px solid green';
                setTimeout(()=>{
                    sendchat.style.border = '1px solid #a7d4e6';
                },500)
            } else {
                sendchat.style.border = '1px solid red';
                setTimeout(()=>{
                    sendchat.style.border = '1px solid #a7d4e6';
                },500)
            }
        })
    });
    req.write(contents);
    req.end()
}
// sendChat('test')