# AJAX

服务端配置：

``````js
//引入express
const express = require('express');

//创建应用对象
const app = express();

//创建路由规则
/*request是对请求报文封装 response是对响应报文封装*/

//GET请求
app.get('/这里填URL',(request,response) => {
	//设置响应体
  response.send('Hello GET');
});
//POST请求
app.post('/这里填URL',(request,response) => {
  response.send('Hello POST');
});
//允许所有方法请求
app.all('/这里填URL',(request,response) => {
  //response.setHeader('Access-Control-Allow-Origin','*');// 设置响应头 设置允许跨域
  response.send('Hello AJAX')
})

//发送JSON数据
app.all('/json-server', (request,response)=>{
  //响应一个数据
  const data = {
    name: 'Payne',
  };
  //对JSON转化字符串
  let str = JSON.stringify(data);

  // 设置响应体
  response.send(str);
});

// 监听端口 启动服务
app.listen(8000, ()=>{
  console.log('服务已经启动，8000端口监听中。。。');
})
``````



## AJAX基本操作

``````js
//创建xhr实例
const xhr = new XMLHttpRequest()

// 初始化 设置请求方法(GET\POST\...)和url
xhr.open('GET','http://xxx.xxx:8000?a=x&b=y');

// 发送
xhr.send();

// on 当...时 readystate xhr对象中的属性，表示状态
// 0(初始)，1(open)，2(send)，3(服务端返回部分结果)，4(服务端返回所有结果)
xhr.onreadystatechange = function (){
  //判断(服务端返回所有结果时)
  if (xhr.readyState === 4){
    //判断响应状态码 200 404 403 500
    if (xhr.status >= 200 && xhr.status < 300){
      // //处理结果 行，头，空行，体
      // console.log(xhr.status);//响应状态码
      // console.log(xhr.statusText);//状态字符串
      // console.log(xhr.getAllResponseHeaders());//所有响应头
      // console.log(xhr.response);//响应体

      // 设置result的文本
      result.innerHTML = xhr.response;
    }
  }
}
``````

## fetch发送AJAX

``````js
fetch('http://localhost:8000/fetch-server?vip=10',{
        //请求方法
        method: "POST",
        //请求头
        headers: {
          name: 'PayneCen'
        },
        //请求体
        body: "username=admin&password=admin"
      }).then(response => {
        return response.json();// return response.text();
      }).then(response => {
        console.log(response);
      })
``````

## axios发送AJAX

```html
<script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/axios/0.26.0/axios.min.js"></script>

<script>
    const btns = document.querySelectorAll('button');
    //配置baseURL
    axios.defaults.baseURL = 'http://localhost:8000';

    btns[0].onclick = ()=> {
      //GET请求
      axios.get('/axios-server',{
        //url参数
        params: {
          id:100,
          vip:7
        },
        //请求头信息
        headers: {
          name: 'Payne',
          age: 20
        }
      }).then(value => {
        console.log(value);
      });
    }

    btns[1].onclick = ()=> {
      //POST请求
      axios.post('/axios-server',{
        //请求体
        username: 'admin',
        password: 'password'
      },{
        //url
        params: {
          id: 111,
          vip: 9
        },
        //请求头参数
        headers: {
          height:180,
          weight:180
        },
      })
    }

    btns[2].onclick = ()=> {
      //通用方法
      axios({
        //请求方法
        method: 'POST',
        //url
        url: '/axios-server',
        //url参数
        params: {
          vip: 10,
          level: 30,
        },
        //头信息参数
        headers: {
          a: 100,
          b: 100,
        },
        //请求体参数
        data: {
          username: 'admin',
          password: 'password',
        }
      }).then(response => {
        console.log(response);
        //响应状态码
        console.log(response.status);
        //响应字符串
        console.log(response.statusText);
        //响应头信息
        console.log(response.headers);
        //响应体
        console.log(response.data);
      })
    }
  </script>
```

## JSONP跨域

JSONP非官方跨域方法，利用html中原生跨域标签 如：==image==|==link==|==script==

由于是利用script标签，`response.send()`中需要放入一个JS语句

``````html
<!--需要在另一处写一个处理函数handle()-->
<script>
  handle = data => {
    const result = document.getElementById('result');
    result.innerHTML = data.name;
  }
</script>

<script src="http://localhost:8000/jsonp-server"></script>
``````

------

``````js
app.all('/jsonp-server', (request,response)=>{
  const data = {name: 'Payne'};
  //对JSON转化字符串
  let str = JSON.stringify(data);
  // 设置响应体
  // response.send('Hello axios');
  response.send(`handle(${str})`);//应用handle()函数
});
``````

## CORS跨域

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）

克服了AJAX==同源策略==  	Origin (源) 同源及：协议相同、域名相同、端口相同

### 简单请求

（1) 请求方法是以下三种方法之一：

- HEAD
- GET
- POST

（2）HTTP的头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个`Origin`字段。

如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段（详见下文），就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。



**（1）Access-Control-Allow-Origin**

该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个`*`，表示接受任意域名的请求。

**（2）Access-Control-Allow-Credentials**

该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为`true`，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为`true`，如果服务器不要浏览器发送Cookie，删除该字段即可。

``````js
//另一方面，开发者必须在AJAX请求中打开withCredentials属性。
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
//否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。

//果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。
``````

**（3）Access-Control-Expose-Headers**

该字段可选。CORS请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。上面的例子指定，`getResponseHeader('FooBar')`可以返回`FooBar`字段的值。



``````js
response.setHeader('Access-Control-Allow-Origin','*');// 设置响应头 设置允许跨域
``````



## CORS与JSONP

JSONP只支持`GET`请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。