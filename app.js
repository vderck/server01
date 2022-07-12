const express = require('express');
const app = express();
// const port = 5000;          //서버 포트 번호 (로컬 3000 -> 5000으로 유연성있게 변경하였으나, 추후 문제시 재 변경)
const port = process.env.NODE_ENV || 3001;
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
 console.log(`서버가 실행됩니다. http://localhost:3001`);
});

// // Keep-Alive Timeout 값 변경
// var server = app.listen(port);
// server.keepAliveTimeout = 300000; 

    

