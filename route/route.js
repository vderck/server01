const express = require("express")
const router = express.Router()

const controller = require("../control/controller");

//유효성
const { body } = require("express-validator");

//세션
const session = require('express-session');
const FileStore = require('session-file-store')(session); // 1

//쿠키
const { Cookie } = require('express-session');



const validationArray = // 유효성 검증
[
body('id')
   .notEmpty()
   .isLength({ min: 1, max : 10  })
   .bail()
   .withMessage("ID 검증에 실패하셨습니다."),
body('pw')
   .notEmpty()
   .isLength({ min: 1, max : 20  })
   .isStrongPassword({
   minLength: 8,
   minLowercase: 1,
   minUppercase: 1,
   minNumbers: 1,
   minSymbols: 1}
   )
   .bail()
   .withMessage("비밀번호 검증에 실패하셨습니다."),
body('name')
   .notEmpty()
   .isLength({ min: 1, max : 10  })
   .bail()
   .withMessage("이름 검증에 실패하셨습니다."),    
body('emailMerge')
   .notEmpty()
   .isLength({min: 1, max: 50})
   .isEmail()
   .bail()
   .withMessage("이메일 검증에 실패하셨습니다."),
body('birthMerge')
   .notEmpty()
   .isInt()
   .isLength(8)
   .bail()
   .withMessage("생년월일 검증에 실패하셨습니다."),
body('passwordQuestion')
   .notEmpty()
   .bail()
   .withMessage("비밀번호 확인 질문 검증에 실패하셨습니다."),  
body('passwordAnswer')
   .notEmpty()
   .bail()
   .withMessage("비밀번호 확인 답변 검증에 실패하셨습니다."),
body('cellPhoneMerge')  
   .notEmpty()
   .isInt()
   .isLength({min: 9, max:11})
   .bail()
   .withMessage("휴대폰 번호 검증에 실패하셨습니다."),
body('zipcode')
   .notEmpty()
   .isInt()
   .isLength(5)
   .bail()
   .withMessage("우편번호 검증에 실패하셨습니다."),
body('addressMerge')
   .notEmpty()
   .isLength({min: 1, max:100})
   .bail()
   .withMessage("주소 검증에 실패하셨습니다.")];


const sessionInfo = session({   
   secret: 'random key',        // 쿠키에 저장할 coonect.sid 값을 암호화
   resave: false,               // 세션 아이디를 접속할때마다 새롭게 발급하지 않음
   saveUninitialized: true,     // 세션 아이디를 실제 사용하기전에는 발급하지 않음
   store: new FileStore(),       // 세션 저장 
   cookie: {
     path: '/',                 // 경로 주어진 경로의 하위 디렉토리에 있는 경우에만 쿠키 설정. default: '/'는 전체
     maxAge: null,
     httpOnly: true,            // http 에서만 쿠키 활용
     secure: false            
   //   _expires: null,      // 쿠키의 만료 시간을 표준 시간으로 설정
   //   originalMaxAge: null,   // 6000 * 100 = 600,000 => 6000초  쿠키가 만료되는 시간 (ms단위) 0으로 설정하면 쿠키가 지워짐
   },
   name: 'sessionID'
 });   


router.post("/check-Id-Duplication", 
             controller.idDuplication);       

router.post("/new-Account", 
             validationArray,
             controller.newAccount);

router.post("/login",
             sessionInfo, 
             controller.login);           
                          


module.exports = router














// //rest api (restful) 
// router.post("/login", controller.login);
// router.post("/write", controller.write);
// router.patch("/deleteaccount", controller.deleteAccount);
