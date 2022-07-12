//유효성 검사 결과
const {validationResult } = require("express-validator");

//DB 파일 Transfer
var database = require('../database/mysql') 


//바디 파싱
var bodyParser = require("body-parser");
const { request, response } = require("express");

//세션
const session = require('express-session');
const FileStore = require('session-file-store')(session); // 1

//쿠키
const { Cookie } = require('express-session');

// //파일 읽기 & 쓰기 모듈
// var fs = require('fs'); // 파일 읽기, 쓰기 등 을 할 수 있는 모듈


const mainScreen = (req,res,next) => {
  res.send('서울 U 에듀 서버 접속');
  };


const newAccount = (req, res, next) => {
      //유효성 검사 처리
      const errors = validationResult(req);
      if (!errors.isEmpty()) { 
      console.log(errors.array());  //에러 검증 로그
      return res.status(400).json({ errors: errors.array() });
      }
      //클라이언트 ip
      const clientIp = req.headers['x-forwarded-for'] ||  req.socket.remoteAddress;

      // DB 데이터 삽입
      var userInfoData = `INSERT INTO userInfo (identification, password, username, Email, birth, passwordQuestion, passwordAnswer, homePhone, cellPhone, zipcode, address, status, registerDate, registerIp, withdrawDate, lastloginTime, lastloginIp, adminmemo) 
                                           VALUE ('${req.body.id}','${req.body.pw}','${req.body.name}','${req.body.emailMerge}','${req.body.birthMerge}','${req.body.passwordQuestion}','${req.body.passwordAnswer}','${req.body.homePhoneMerge}','${req.body.cellPhoneMerge}','${req.body.zipcode}','${req.body.addressMerge}',1,CURRENT_TIMESTAMP,'${clientIp}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'${clientIp}','메모없음')`;
        
      database.connection.query(userInfoData, (error,results) =>{
        if(error) throw error;
        console.log(results);  //데이터 전송 결과 로그
      });
        
      //현재는 netlify 사이트이므로 추후 서버 배포시 재 변경
      res.redirect('https://master--gleeful-mooncake-b7be4b.netlify.app/html/new-account-congratulation');
  };

const idDuplication = (req,res, next) => {

      // 추후 Orgin을 *이 아닌 HTTP URL로 변경해주기
      res.setHeader('Access-Control-Allow-origin', '*');

      // DB 존재값 체크 쿼리
      var checkUserID = `select EXISTS (select identification from userInfo where identification = '${req.body.id}' limit 1) as success`;                
    
      database.connection.query(checkUserID, (error,results) =>{
        if(error) throw error;
        // 데이터 전송 결과 로그
        console.log(results);
        // 값 존재 - 1 , 값 존재 - 0 
        if(results[0].success === 1){
          res.json("true");
        } else {
          res.json("false");
        }
      });

      
};



// var file = require('fs');
// var fileList = file.readdirSync('../sessions/');

// const sessionFolder = '../server01/sessions';
// const fileReadDirSync = require('fs');

// fileReadDirSync.readdir(sessionFolder, (error, files) => {
//   if (error) throw error;
//   files.forEach(file => {
//     fileNames.push(file);
//     console.log(fileNames);
//     fileNames[0];
//     console.log(fileNames[0]);
//   });
// });






const login = (req,res,next) => {

  // DB 존재값 체크 쿼리
  var checkUserID = `select EXISTS (select identification from userInfo where (identification = '${req.body.id}' AND password='${req.body.password}') limit 1) as success;`             

  database.connection.query(checkUserID, (error,results) =>{
    if(error) throw error;
    // 데이터 전송 결과 로그
  

    if(req.session.isLoggedIn){
      console.log("request한 유저가 로그인 하였습니다.")
    }
    console.log(results);
    // 값 존재 - 1 , 값 존재 - 0 
    if(results[0].success === 1){
      console.log(req.sessionID);
      res.setHeader('Set-Cookie', 'big_cookie=choco');
      // res.end('Cookie!!');
      res.redirect("https://seouluclient.herokuapp.com/html/login.html");
    } else {
      req.session.isLoggedIn = false;
      console.log(req.sessionID);
      res.setHeader('Set-Cookie', 'big_cookie=choco');
      // res.end('Cookie!!');
      res.redirect("https://seouluclient.herokuapp.com/html/login.html");
    }
  });

  
  // if(req.sessionID === 'dUSTWolFCVMbFMTezw0vLEKO2nu78BSj'){
  //   res.send("세션 통신에 성공하셨습니다.");
  // }

  // console.log(req.session.userId);

  // res.end("cookie");
};

  module.exports = {
    mainScreen,
    newAccount,
    idDuplication,
    login
  };









// const login = function (req, res, next) {
//     res.send("로그인에 성공하셨습니다.")
// };
  

// const deleteAccount = (req, res, next) => {
//     res.send("회원탈퇴 하셨습니다.")
//   };

// const write = (req, res, next) => {
//   res.send("글쓰기에 성공하셨습니다.")
// };