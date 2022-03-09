// 引入express
const express = require('express');

// 创建应用对象
const app = express();

// 创建路由规则
// request是对请求报文封装，response是对响应报文封装
app.all('/jsonp-server', (request,response)=>{
  const data = {name: 'Payne'};
  //对JSON转化字符串
  let str = JSON.stringify(data);
  // 设置响应体
  // response.send('Hello axios');
  response.send(`handle(${str})`);

});


// 监听端口 启动服务
app.listen(8000, ()=>{
  console.log('服务已经启动，8000端口监听中。。。');
})