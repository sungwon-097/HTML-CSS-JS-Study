const express = require('express');
const { dirname } = require('path/posix');
const app = express();

const server = app.listen(3000, () => {
    console.log('Start server : localhost:3000');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html')
  })

app.get('/about', function (req, res) {
    res.render('about.html')
  })

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
  });

app.get('/db', function (req, res) {
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query('SELECT * FROM Test', function (error, results, fields) {
            res.send(JSON.stringify(results));
            console.log('results', results);
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          // Don't use the connection here, it has been returned to the pool.
        });
      });
  })