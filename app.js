const express = require('express');
const app = express();
const port = 3000;          //서버 포트 번호 

//바디 파서
var bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');


// 미들웨어 사용 부문
const route = require("./route/route");
const { use } = require('./route/route');
app.use("/", route) 


app.listen(port, '0.0.0.0' , () => {
 console.log(`서버가 실행됩니다. http://localhost:${port}`);
});

// // Keep-Alive Timeout 값 변경
// var server = app.listen(port);
// server.keepAliveTimeout = 300000; 

    

