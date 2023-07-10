import "bootstrap/dist/css/bootstrap.min.css";
import UtilStyle from "./Util.module.scss";
import { InputGroup, Button, Form } from "react-bootstrap";
import stringUtil00 from "@utils/basis/stringUtil00";
import { UtilLayout } from "@components";

function StringUtil() {
 

    // 계좌 하이픈 삽입 
    const formatAccountNumber = (str)=>{ 
      return stringUtil00.formatAccountNumber(str.input);
  }
    // 계좌 하이픈 제거
    const removeAcctFor = (str)=>{ 
      return stringUtil00.removeAcctFor(str.input);
    }

    // 문자열의 바이트 수 리턴
    const calByteLength = (str)=>{ 
      return stringUtil00.sbGetByteLength(str.input);
  }

    // 계좌번호 마스킹
    const maskingAccountNo = (str)=>{ 
      return stringUtil00.sbMaskingAccountNo(str.input);
    }
    
    // 숫자값만 얻어오기
    const getOnlyNumber = (str)=>{ 
      return stringUtil00.sbGetOnlyNumber(str.input);
    }
    // 전화번호 마스킹 
    const maskingPhone = (str) =>{ 
      return stringUtil00.sbMaskingPhone(str.input);
    } 
  
    // 영문성명 마스킹
    const maskingEngName = (str)=>{ 
      return stringUtil00.sbMaskingEngName(str.input);
    }
  
    // 한글만 존재하는지 여부
    const hasOnlyKorean = (str) =>{ 
      const rs = stringUtil00.sbHasOnlyKorean(str.input);
      return rs ? "true" : "false";
    } 

    // 문자열 replaceAll
     const replaceAll = (str) =>{ 
      return stringUtil00.sbReplaceAll(str.input1,str.input2,str.input3);
    } 

    // 금액 콤마 제거
      const transMoney = (str) =>{ 
      return stringUtil00.sbTransMoney(str.input);
    } 

    // 금액 콤마 삽입
    const getFormatAmt = (str) =>{ 
      return stringUtil00.sbGetFormatAmt(str.input);
    } 
    
    // 전화번호 포맷 
    const formatTelNo = (str) =>{ 
      return stringUtil00.sbFormatTelNo(str.input);
    } 

    // 랜덤 문자열 생성
    const randomId = ()=>{ 
      return   stringUtil00.randomId();
    };
  
 
   let contextArr = [];
  contextArr = [
    {
      title: "formatTelNo",
      description: "전화번호 포맷 리턴",
      calFunc: formatTelNo,
      inputTitArr: [{ title: "input" }],
    },
    
     {
      title: "getFormatAmt",
      description: "금액 콤마 삽입",
      calFunc: getFormatAmt,
      inputTitArr: [{ title: "input" }],
    },

    {
      title: "transMoney",
      description: "금액 콤마 제거",
      calFunc: transMoney,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "replaceAll",
      description: "문자열 replaceAll",
      calFunc: replaceAll,
      inputTitArr: [{ title: "input1" }, { title: "input2" }, { title: "input3" }],
    },
    {
      title: "hasOnlyKorean",
      description: "한글만 존재하는지 여부",
      calFunc: hasOnlyKorean,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "formatAccountNumber",
      description: "계좌번호 - 삽입",
      calFunc: formatAccountNumber,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "getOnlyNumber",
      description: "숫자값만 얻어오기",
      calFunc: getOnlyNumber,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "maskingAccountNo",
      description: "계좌번호 마스킹",
      calFunc: maskingAccountNo,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "calByteLength",
      description: "문자열의 바이트 수 리턴",
      calFunc: calByteLength,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "maskingPhone",
      description: "전화번호 마스킹",
      calFunc: maskingPhone,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "maskingEngName",
      description: "영문 성명 마스킹",
      calFunc: maskingEngName,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "randomId",
      description: "랜덤 문자열 생성",
      calFunc: randomId
    },
  ];

  return (
    <div className={UtilStyle["context"]}>
    {contextArr.map((item, idx) => {
      
      return (
        <UtilLayout
          key={`funclist${idx}`}
          title={item.title}
          description={item.description}
          calFunc={item.calFunc}
          inputTitArr={item.inputTitArr}
        ></UtilLayout>
      );
    })}

    {}
  </div>
  );
}


export default StringUtil;


 
  
