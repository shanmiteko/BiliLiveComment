# BiliLiveComment
## 描述
使BiliBili弹幕单独显示的桌面客户端  
## 实现方式
**Nodejs(electron)**+**H5**  
>使用 JavaScript，HTML 和 CSS 构建的桌面应用程序  

![示例图](REDME.png\example.png)
## 功能
- 主要功能  
    - 评论滚动显示  
    - 快捷签到  
    - 发送评论  
- 调节  
    - 左侧滑块调节短轮询频率  
    - 右上隐藏式下拉菜单  

---

## 如何使用
```
BiliLiveComment
    │.gitignore
    │  favicon.ico
    │  main.js
    │  nohup.out
    │  package.json
    │  preload.js
    │  README.md
    │  start.bash (此处启动)
    │  tree.txt
    │  
    ├─.vscode
    │      launch.json
    │      
    ├─app
    │      room.js (在此文件中添加房间信息)
    │      cookie (在此文件中添加cookie)
    │      chat.js
    │      daycheck.js
    │      index.html
    │      public.js
    │      send.js
    │      style.css
    │      
    └─REDME.png
            example.png
```
**文件内容要求**  
`./app/room.json`  
```json
{
    /* 用户名(string): 对应的roomid(number) */
    "哔哩哔哩弹幕网": 2233,
}
```
`./app/cookie`  
```markdown
cookie中的以下键值对(最后加空格)
格式-> SESSDATA=697ab56%122%2202C7C1861268918*81; 
```
命令行启动  
```bash
$ npm start
```
## Bili API
直播间评论(POST)  
[api.live.bilibili.com/xlive/web-room/v1/dM/gethistory](https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory)  
签到(GET)  
[api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign](https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign)  
发送评论(POST)  
[api.live.bilibili.com/msg/send](https://api.live.bilibili.com/msg/send)

---
v1.0待优化  
(坑太多放弃重构)
