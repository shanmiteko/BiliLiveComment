const {ipcRenderer} = require('electron');
const {stringify} = require('querystring');

let box = document.getElementsByClassName('danmaku-box')[0];
let input = document.querySelector('input[type=range]');
let rangeValue = document.querySelector('.speed .rangevalue');
let fontnum = document.querySelector('.fontnum>i');
let roomlistul = document.querySelector('.roomlist>ul');
let room = 0;

(()=>{
    windowChangeH();
    /* 禁止选中文本 */
    document.onselectstart = ()=>{return false}
    /* 速度条初始化 */
    document.styleSheets[0].addRule('input[type=range]::-webkit-slider-runnable-track',"background: linear-gradient(to right, skyblue 100%, white 100%, white)")
    rangeValue.onmouseover = ()=>{
        rangeValue.style.color = 'rgba(128, 128, 128, 0.534)';
    }
    rangeValue.onmouseout = ()=> {
        rangeValue.style.color = 'transparent'
    }
    /* 初始化房间列表 */
    ipcRenderer.send('whichroom','init');
    ipcRenderer.on('roomlist',(event,arg)=>{
        for (let key in arg) {
            let li = document.createElement('li');
            li.setAttribute('title',key);
            li.setAttribute('onclick',`ipcRenderer.send('whichroom','${key}');`)
            li.innerText = key;
            roomlistul.appendChild(li)
        }
    })
})()
function windowChangeH(){
    if (window.onresize == null) {
        window.onresize = () => {
            windowChangeH();
        }
    }
    box.style.height = (window.innerHeight - 80)+'px';
}
function showRoomList() {
    const box = document.querySelector('.roomlist-box');
    const roomlist = document.querySelector('.roomlist');
    box.style.visibility = 'visible';
    const offset = 140;
    roomlist.style.height = `${window.innerHeight-offset}px`
    setTimeout(()=>{
        roomlist.style.height = '0px';
        setTimeout(()=>{
            box.style.visibility = 'hidden';
        },300)
    },5000)
}
function setcolor(value,max,min) {
    const per = ((parseInt(value)- parseInt(min))/(parseInt(max) - parseInt(min)))*100+'%';//区间长度
    let styleSheets = document.styleSheets[0];
    styleSheets.addRule('input[type=range]::-webkit-slider-runnable-track',`background: linear-gradient(to right, skyblue ${per}, white ${per}, white)`);
    styleSheets.deleteRule(styleSheets.cssRules.length - 2);
    showRangeValue(value);
}
function wheelsetcolor() {
    const e = window.event;
    let value = parseInt(input.value);
    let step = parseInt(input.step);
    if(e.wheelDelta < 0){
        input.value = value - step;
        setcolor(input.value,input.max,input.min);
    }
    else {
        input.value = value + step;
        setcolor(input.value,input.max,input.min);
    }
}
function showRangeValue(num) {
    rangeValue.innerText = num;
    rangeValue.style.color = 'rgba(128, 128, 128, 0.534)';
    setTimeout(()=>{
        rangeValue.style.color = 'transparent'
    },300)
}
function changeFontNum(e) {
    /* 无法监听由脚本改变值的事件 */
    value = e.replace(/[\r\n]/g,"");
    fontnum.innerText = value.length;
}
function sendValue(e) {
    e.style.border = '1px solid #a7d4e6';
    if (typeof e.onkeydown != 'function'&& typeof e.onblur != 'function') {
        e.onkeydown = ()=>{
            if (event.keyCode == 13) {
                /*按下回车键*/
                if (e.value == '') {
                    return false
                } else{
                    sendChat(e.value);
                    e.value = null;
                    fontnum.innerText = 0;
                    return false
                }
            }
        };
        e.onblur = ()=>{
            e.style.border = '1px solid #80808034';
        }
    }
    else {
        return 0;
    }
}