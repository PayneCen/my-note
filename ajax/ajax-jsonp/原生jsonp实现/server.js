const express = require('express');
const app = express();

app.all('/check-username', (request,response)=>{
  const data = {
    exit: 1,
    msg: '用户名已经存在'
  };
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