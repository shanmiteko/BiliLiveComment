<h1>BiliLiveComment</h1>
<p>显示B站直播间评论</p>
<hr>
<h2>Electron项目</h2>
<p><strong>Nodejs+原生JavaScript</strong></p>
<p>使用 JavaScript，HTML 和 CSS 构建的桌面应用程序</p>
<img title='示例图1' src= 'REDME.png\example1.png' width="200px"></img>
<img title='示例图2' src= 'REDME.png\example2.png' width="200px"></img>
<hr>
<h2>功能</h2>
<ul>
    <li>评论滚动显示</li>
    <li>快捷签到</li>
    <li>发送评论</li>
</ul>
<p>左侧滑块调节短轮询频率</p>
<p>右上隐藏式下拉菜单</p>
<hr>
<h2>如何使用<h2>
<p>app/cookie文件中加入cookie<p>
<p>app/room文件中加入房间信息<p>
<hr>
<h2>使用接口</h2>
<p>直播间评论(POST)</p> 
<a title='直播间评论' href="https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory">api.live.bilibili.com/xlive/web-room/v1/dM/gethistory</a>
<p>签到(GET)</p>
<a title='签到' href="https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign">api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign</a>
<p>发送评论(POST)</p>
<a title='发送评论' href="https://api.live.bilibili.com/msg/send">api.live.bilibili.com/msg/send</a>
<hr>
<p>v1.0待优化</p>
<p>(坑太多放弃重构)</p>
