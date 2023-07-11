import "bootstrap/dist/css/bootstrap.min.css";
import UtilStyle from "./Util.module.scss";
import { InputGroup, Button, Form } from "react-bootstrap";
import { UtilLayout } from "@components";
import {commonUtil} from "@utils";
import { useState } from "react";
import shCommon from "@commmons/shCommon"
function CommonUtil() {
    const escape = val =>{
        return commonUtil.escape(val.input1)
    };
    const sbMaskingAccountNo = val=>{
        return commonUtil.sbMaskingAccountNo(val.input1,val.input2)
    };
    const sbMaskingCardNo = val=>{   
        return commonUtil.sbMaskingCardNo(val.input1,val.input2);
    };
    const sbIsNull = val=>{
        
        return (commonUtil.sbIsNull(val.input))?"true":"false";
    };
    const sbMaskingKorName = val=>{
        commonUtil.sbMaskingKorName();
        return commonUtil.sbMaskingKorName(val.input1,val.input2)
    };
    let contextArr = [
        {
            title:"escape",
            description:"문자열에서 특수문자를 변환해서 리턴",
            calFunc : escape,
            inputTitArr:[{ title: "input1" }]
        },
        {
            title:"sbMaskingAccountNo",
            description:"계좌번호마스킹: 4번째~7번째",
            calFunc : sbMaskingAccountNo,
            inputTitArr:[
                 { title: "input1", placeholder: "계좌번호" }
                ,{ title: "input2", placeholder: "마스킹할 기호(default:●)" }
                ]
        },
        {
            title:"sbMaskingCardNo",
            description:"카드번호마스킹: 5번째~10번째 + 마지막 자리",
            calFunc : sbMaskingCardNo,
            inputTitArr:[
                { title: "input1", placeholder: "카드번호" }
               ,{ title: "input2", placeholder: "마스킹할 기호(default:●)" }
               ]
        },
        {
            title:"sbIsNull",
            description:"null 체크함수",
            calFunc : sbIsNull,
            inputTitArr:[{ title: "input" }]
        },
        {
            title:"sbMaskingKorName",
            description:"국문성명 마스킹 리턴한다",
            calFunc : sbMaskingKorName,
            inputTitArr:[
                { title: "input1", placeholder: "성명" }
               ,{ title: "input2", placeholder: "마스킹할 기호(default:●)" }
               ]
        }
        
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
        </div>
      );
}

export default CommonUtil;
