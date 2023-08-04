import { useState, useEffect } from "react";
import Styles from "./AccMngList.module.scss";

const InfoList = {
  data: [
    {
      keyCode: "1",
      accNo: "110-251-369493",
      bankInfo: ["신한", "TOP 직장인플랜 저축예금"],
    },
    {
      keyCode: "2",
      accNo: "110-525-092986",
      bankInfo: ["신한", "SOL편한 입출금통장"],
    },
    {
      keyCode: "3",
      accNo: "180-006-795477",
      bankInfo: ["신한", "외화 체인지업 예금(EUR)"],
    },
  ],
};

function CommonAccMngList() {
  console.log("== CommonAccMngList ==");

  for (const key in Object.keys(InfoList["data"])) {
    console.log(InfoList.data[key].accNo);
  }

  return (
    <div>
      <h2>출금 계좌</h2>
      <div>
        <div className={Styles.all_check}>
          <label for="allcheck01">전체선택</label>
          <input type="checkbox" id="allcheck01" />
        </div>        
        {InfoList["data"].map((it) => {
          return (
            <div className={Styles.list_wrap} key={it.keyCode}>
              <ul className={Styles.list}>
                <li className={Styles.item}>은행 : {it.bankInfo[0]}</li>
                <li className={Styles.item}>계좌명 : {it.bankInfo[1]}</li>
                <li className={Styles.item}>계좌번호 : {it.accNo}</li>                
              </ul>
              <input type="checkbox" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommonAccMngList;
