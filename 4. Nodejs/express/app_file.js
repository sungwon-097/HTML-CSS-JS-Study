var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
const { runInNewContext } = require('vm');

app.use(express.static('views_file'));
app.use(bodyParser.urlencoded({extended: false})); // post방식 사용
app.locals.pretty = true;

app.set('views', 'views_file'); // 템플릿 엔진의 파일 경로
app.set('view engine', 'pug'); // pug 템플릿 엔진 사용

app.get('/topic/new', function(req, res){   // 새파일 지정
    fs.readdir('data', function(err, files){
    if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
    });
});

// app.get('/topic', function(req, res){   // 저장한 파일의 목록을 출력
//     fs.readdir('data', function(err, files){
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         res.render('view', {topics:files});
//     })
// });

// app.get('/topic/:id', function(req, res){
//     var id = req.params.id;
//     fs.readdir('data', function(err, files){
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         fs.readFile('data/'+id, 'utf-8', function(err, data){
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         res.render('view', {topics:files, title:id, description:data});
//         })
//     })
// });

// app.post('/topic', function(req, res){ // 파일 저장
//     var title = req.body.title;
//     var description = req.body.description;
//     fs.writeFile('data/'+title, description, function(err){
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         res.send('Success!');
//     })
// });

// app.listen(3000, function(){
//     console.log('Connected, 3000 port!');
// });

// 중복코드 수정
app.get(['/topic', '/topic/:id'], function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){
            // id 값이 있을 때
            fs.readFile('data/'+id, 'utf-8', function(err, data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics:files, title:id, description:data});
            })
        }
        else{
            // id 값이 업을 때
            res.render('view', {topics:files, title:'Welcome', description:'Hello, JS for Server'});
        }
    })
});

app.post('/topic', function(req, res){ // 파일 저장
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title); // 이동하고 싶은 페이지로 이동
    })
});

app.listen(3000, function(){
    console.log('Connected, 3000 port!');
});