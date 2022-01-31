var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', function(req, res) {
    res.send('hello home page');
});
app.get('/dynamic', function(req, res) {
    var lis = '';
    for(var i =0; i < 5 ; i++){
        lis = lis + '<li>coding</li>';
    }
    var time = Date();
    var output = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
        ${lis}
        </ul>
        ${time}
    </body>
    </html>`
    res.send(output);
    // 동적으로 처리 시 변경사항을 적용하기 위해 서버를 종료 후 가동해야 한다. 정적은 새로고침후 적용
    // 같은 결과를 가질 수 있지만 js파일에서 웹페이지를 구현을 할 경우 연산작업이 가능함
});
app.get('/route', function(req, res) {
    res.send('hello Router, <img src="/route.png">');
});
app.get('/login', function(req, res) {
    res.send('<h1>login please</h1>');
});
app.listen(3000, function() {
    console.log('Connected 3000 port!');
});