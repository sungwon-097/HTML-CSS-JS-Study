var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res) { // 
    res.send('hello home page');
});

app.get('/template', function(req, res){
    res.render('temp', {time:Date(), _title:'__pug__'}); // template경로로 들어온 사용자에게 function이 실행이 되면서 temp파일을 웹페이지로 렌더링해 실행
});

app.get('/dynamic', function(req, res) {
    var lis = '';
    for(var i = 0 ; i < 5 ; i ++){
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

app.get('/topic/:id', function(req, res){
    // res.send(req.query.id+ ', '+req.query.name); // id, name 인자를 이용한 query String
    var topics = [
        'JS is ....',
        'NODE is ....',
        'Express is ....'
    ];
    var output =`
    <a href="/topic/0">JS</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br>
    ${topics[req.params.id]}
    `// ${topics[req.query.id]}
    res.send(output);
    // res.send(topics[req.query.id]);
});

app.get('/top/:id/:mode', function(req, res) {
    res.send(req.params.id+','+req.params.mode);
});

app.get('/form', function(req, res) {
    res.render('form');
});

app.get('/form_receiver', function(req, res) {
    var title = req.query.title;
    var discription = req.query.description;
    res.send(title+','+discription);
});

// app.post('/form_receiver', function (req, res, next) {
//     var title = req.body.title;
//     var discription = req.body.description;
//     console.log(req.body.title)
//     res.json(req.body)
//   })

// url상으로 데이터를 표현하지 않을 때 post 방식을 사용하는 것이 효율적(불필요하게 데이터를 전달하지 않음)

app.get('/route', function(req, res) {
    res.send('hello Router, <img src="/route.png">');
});

app.get('/login', function(req, res) {
    res.send('<h1>login please</h1>');
});

app.listen(3000, function() {
    console.log('Connected 3000 port!');
});