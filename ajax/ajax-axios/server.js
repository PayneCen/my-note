// 引入express
const express = require('express');

// 创建应用对象
const app = express();

// 创建路由规则
// request是对请求报文封装，response是对响应报文封装
app.all('/axios-server', (request,response)=>{
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Headers','*');
  // 设置响应体
  // response.send('Hello axios');
    //响应一个数据
  const data = {
    name: 'Payne',
  };
  //对JSON转化字符串
  let str = JSON.stringify(data);

  // 设置响应体
  response.send(str);

});

// app.all('/json-server', (request,response)=>{
//   // 设置响应头 设置允许跨域
//   response.setHeader('Access-Control-Allow-Origin','*');
//
//   //响应一个数据
//   const data = {
//     name: 'Payne',
//   };
//   //对JSON转化字符串
//   let str = JSON.stringify(data);
//
//   // 设置响应体
//   response.send(str);
// });

// 监听端口 启动服务
app.listen(8000, ()=>{
  console.log('服务已经启动，8000端口监听中。。。');
})