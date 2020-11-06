/* 主动请求并接受弹幕 */
const request_chat = require('http').request;

let showchat_background = document.querySelector('.showchat-background');
let showchat = document.querySelector('.showchat');
let range = document.querySelector('input[type=range]');
let circle = document.querySelector('.circle');
let timeoutID = 0;
let D = new Array();
let chatnum = 0;

let contents = '';
let options = '';
ipcRenderer.on('thisroom',(event,arg)=>{
    room = arg;
    contents = stringify({
        roomid: arg
    });
    options = {
        host: 'api.live.bilibili.com',
        path: '/xlive/web-room/v1/dM/gethistory',
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*',
            'Content-Length': contents.length,
            'Origin': 'https://live.bilibili.com',
            'Cookie': cookie
        }
    };
    /*点击nickname成功后自动关闭roomlist*/
    (()=>{
        const roomlist = document.querySelector('.roomlist');
        roomlist.style.height = '0px';
        setTimeout(()=>{
            const box = document.querySelector('.roomlist-box');
            box.style.visibility = 'hidden';
        },300)
    })()
})

const scroll = ()=>{
    let scrollHeight = showchat_background.scrollHeight;
    showchat_background.scrollTo({
        top: scrollHeight,
        left: 0,
        behavior: "smooth"
    });
    if (chatnum > 99) {
        setTimeout(()=>{
            /* 差不多滚完后就清除多余的信息 */
            while (chatnum > 99) {
                showchat.removeChild(showchat.firstElementChild);
                chatnum = chatnum - 1;
            }
        },400)
    }
}
const protoJsonstrToJsonList = (jsonstr) => {
    let isJSON = str => {
        if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    return true;
                }else{
                    return false;
                }
            } catch(e) {
                console.error('error：'+str+'!!!'+e);
                return false;
            }
        }
        console.error('It is not a string!')
    }
    let data = [];
    if (jsonstr != ''&& isJSON(jsonstr)) {
        let json = JSON.parse(jsonstr);
        let room = json.data.room;
        if (room.length != 0){
            for (var i = 0; i < room.length; i++) {
                if (room[i].medal.length != 13){
                    data.push(['没有牌子的路人(-_-)','',room[i].user_level[0],room[i].nickname,room[i].text,room[i].check_info.ts+room[i].check_info.ct])
                }
                else {
                    data.push([room[i].medal[1],room[i].medal[0],room[i].user_level[0],room[i].nickname,room[i].text,room[i].check_info.ts+room[i].check_info.ct])
                }
            } 
        } 
        else {
            data.push(['null','',0,'[***本软件温馨提示***]','无历史弹幕数据']);
        }
    }
    else {
        data.push(['error','',0,'error','JSON ERROR'])
    };
    jsonstr = null;
    isJSON = null;
    return data
}
const addEle = (xn,xdj,ul,nickname,text) => {
    const ulcolor = ['#969696','#61c05a','#5896de','#a068f1','#ff86b2','#ff9f3d'];
    const xcolor = ['#5CC05C','#5896DE','#A068F1','#FF86B2','#F6BE18'];
    const jzcolor = ['#AFC1AF','#B7C9DE','#D8C9F0','#FFE5F0','#F5E8C1'];
    var chat = document.createElement('div');
    chat.setAttribute('class','chat');
    var xun = document.createElement('div');
    xun.setAttribute('class','xun');
    var userinfo = document.createElement('div');
    userinfo.setAttribute('class','userinfo');
    chat.appendChild(xun);
    chat.appendChild(userinfo);
    var span =  new Array(5);
    for (let index = 0; index < span.length; index++) {
        span[index] = document.createElement('span')
    }
    span[0].innerText = 'UL'+ul+' ';
    span[1].innerText = xn;
    span[2].innerText = ' '+xdj;
    span[3].innerText = nickname;
    span[4].innerText = text;
    switch (parseInt((ul-1)/10)) {
        case 0:
            span[3].style.color = ulcolor[0]            
            break;
        case 1:
            span[3].style.color = ulcolor[1]            
            break;
        case 2:
            span[3].style.color = ulcolor[2]            
            break;
        case 3:
            span[3].style.color = ulcolor[3]            
            break;
        case 4:
            span[3].style.color = ulcolor[4]            
            break;
        case 5:
            span[3].style.color = ulcolor[5]            
            break;
        default:
            break;
    }
    switch (parseInt((xdj-1)/4)) {
        case 5:
            chat.style.backgroundColor = jzcolor[0]
        case 0:
            span[0].style.color = xcolor[0];
            span[1].style.color = xcolor[0];
            span[2].style.color = xcolor[0];
            break;
        case 6:
            chat.style.backgroundColor = jzcolor[1]
        case 1:
            span[0].style.color = xcolor[1];
            span[1].style.color = xcolor[1];
            span[2].style.color = xcolor[1];
            break;
        case 7:
            chat.style.backgroundColor = jzcolor[2]
        case 2:
            span[0].style.color = xcolor[2];
            span[1].style.color = xcolor[2];
            span[2].style.color = xcolor[2];
            break;
        case 8:
            chat.style.backgroundColor = jzcolor[3]
        case 3:
            span[0].style.color = xcolor[3];
            span[1].style.color = xcolor[3];
            span[2].style.color = xcolor[3];
            break;
        case 9:
            chat.style.backgroundColor = jzcolor[4]
        case 4:
            span[0].style.color = xcolor[4];
            span[1].style.color = xcolor[4];
            span[2].style.color = xcolor[4];
            break;
        default:
            break;
    }
    for (let index = 0; index < span.length; index++) {
        if (index < 3) {
            xun.appendChild(span[index])
        }
        else {
            userinfo.appendChild(span[index])
        }
    }
    showchat.appendChild(chat);
    chatnum = chatnum + 1;
}
const getChatList = ()=>{
    return new Promise(resolve => {
        let chatstr = '';
        let req = request_chat(options,res => {
            if (res.statusCode == 200) {
                const contype =  res.headers['content-type'];
                res.setEncoding('utf8');
                res.on('data',chunk => {
                    chatstr = chatstr + chunk;
                    chunk = null;
                });
                res.on('end',()=>{
                    let jsonlist = /^application\/json/.test(contype) ? protoJsonstrToJsonList(chatstr) : protoJsonstrToJsonList('');
                    chatstr = null;
                    resolve(jsonlist);
                })
            }
            res.on('error', () => {
                resolve([['error','',0,'error','RESPONSE ERROR']])
            })
        });
        req.write(contents);
        req.end();
        /* 结束请求 */
    });
};
const show = (d)=>{
    /* 一次最多捕捉10个 */
    let j = D.length;
    if (D.length == 0){
        for (let index = 0; index < d.length; index++) {
            addEle(d[index][0],d[index][1],d[index][2],d[index][3],d[index][4]);
        }
    } else {
        /**
         * 首先判断这次和上一次是否完全相等
         */
        if (d.toString() != D.toString()) {
            /**
             * (从零开始计数)
             * chatlist中第5项由check_info中的ts与ct字段拼接而成(形如159448140078E7E60F)可作为唯一标识符
             * 新获得的chatlist与上一次的chatlist进行比较
             * 这一次的第一个与上一次的最后一个开始进行倒序比较
             * 得到j 即上一次从第j个开始出现重复
             */
            for (let index = j - 1; index > -1; index--) {
                if(d[0][5] == D[index][5]){
                    j = index;
                    break;
                }
            }
            /**
             * 若出现重复,则得到这一次应从index = 9(上一次最后一个)-j+1开始
             */
            for (let index = D.length-j; index < d.length; index++) {
                addEle(d[index][0],d[index][1],d[index][2],d[index][3],d[index][4]);
            }
            // f(j)
        } else {
            addEle('','',0,'[***本软件温馨提示***]','请适当降低请求速度或中止请求');
            // f(0);
        }
    }
    /* 评论流量显示 */
    function f(p) {
        let c = '';
        for (let index = 0; index < p; index++) {
            c += '*';
        }
        if (p == 10) {
            console.log(`x ${Date.now()} ${c}`);
            return 0;
        }
        console.log(`${p} ${Date.now()} ${c}`);
    }
    scroll();
    D = d;
    let t = range.value;
    timeoutID = window.setTimeout(() => {
        circle.style.backgroundColor = 'green';
        run();
    },t);
    circle.style.backgroundColor = 'yellow';
}
circle.onmouseup = ()=>{
    circle.style.backgroundColor = 'red';
    window.clearTimeout(timeoutID);
}
function run (){
    let chatlist = getChatList();
    chatlist.then((d)=>{
        show(d);
        chatlist = null;
    },null)
}