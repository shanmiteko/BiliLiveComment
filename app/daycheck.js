/* 签到 */
const request_daycheck = require('http').request;
const doSign = () => {
    let daycheck = document.querySelector('.daycheck>p');
    const options = {
        host: 'api.live.bilibili.com',
        path: '/xlive/web-ucenter/v1/sign/DoSign',
        method: 'GET',
        headers: {
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
            'Origin': 'https://live.bilibili.com',
            'Cookie': cookie
        }
    }
    let req = request_daycheck(options,res=>{
        res.setEncoding('utf8');
        res.on('data',data=>{
            const datajson = JSON.parse(data);
            if (datajson.code == 0) {
                daycheck.innerText = '签到成功'
            }
            if (datajson.code < 0 ) {
                daycheck.innerText = '出现错误'
            }
            if (datajson.code > 0 ) {
                daycheck.innerText = '已签到';
            }
        })
    });
    req.end()
    document.querySelector('.daycheck').onclick = null;
}