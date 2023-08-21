import { useState, useEffect } from "react";
import Styles from "./Develop.module.scss";
import { Toggle } from "@components";
import { Tooltip } from "@components";

function HomeSetup() {
  console.log("== HomeSetup ==");
  let [option1, setOption1] = useState(false);
  let [option2, setOption2] = useState(false);

  function moveFuntion() {
    alert("해당화면으로 이동합니다. (테스트)");
  }

  return (
    <div className={Styles.page}>
      <div className={Styles.header}>
        <h1>설정</h1>
      </div>
      <div className={Styles.table01_area}>
        <em>
          <span style={{ fontWeight: "bold", color: "red" }}>홈설정</span>
        </em>
        <table className={Styles.table01}>
          <tbody>
            <tr>
              <th scope="row">홈화면</th>
              <td onClick={() => moveFuntion()}>
                <span style={{ fontWeight: "bold", color: "#2F855A" }}>
                  기본
                </span>
                &nbsp;&gt;
              </td>
            </tr>
            <tr>
              <th scope="row">큰글씨</th>
              <td>
                {" "}
                <Toggle
                  id="option1"
                  small
                  disabled={false}
                  checked={option1}
                  onChange={setOption1}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">계좌순서</th>
              <td onClick={() => moveFuntion()}>&gt;</td>
            </tr>
            <tr>
              <th scope="row">메뉴맞춤설정</th>
              <td onClick={() => moveFuntion()}>&gt;</td>
            </tr>
          </tbody>
        </table>

        <em>
          <span
            style={{
              fontWeight: "bold",
              color: "red",
              borderTop: "1px solid red",
              margin: "30px 0px",
            }}
          >
            로그인설정
          </span>
        </em>
        <table className={Styles.table01}>
          <tbody>
            <tr>
              <th scope="row">
                자동로그인
                <Tooltip content="자동로그인 설명" position="center">
                  ❓
                </Tooltip>{" "}
              </th>
              <td onClick={() => moveFuntion()}>
                <span style={{ fontWeight: "bold", color: "#2F855A" }}>
                  기본
                </span>
                &nbsp;&gt;
              </td>
            </tr>
            <tr>
              <th scope="row">기본 로그인방법</th>
              <td onClick={() => moveFuntion()}>
                <span style={{ fontWeight: "bold", color: "#2F855A" }}>
                  간편비밀번호인증
                </span>
                &nbsp;&gt;
              </td>
            </tr>
            <tr>
              <th scope="row">인증/보안</th>
              <td onClick={() => moveFuntion()}>&gt;</td>
            </tr>
            <tr>
              <th scope="row">메뉴맞춤설정</th>
              <td onClick={() => moveFuntion()}>&gt;</td>
            </tr>
          </tbody>
        </table>

        <em>
          <span
            style={{
              fontWeight: "bold",
              color: "red",
              borderTop: "1px solid red",
              margin: "30px 0px",
            }}
          >
            알림설정
          </span>
        </em>
        <table className={Styles.table01}>
          <tbody>
            <tr>
              <th scope="row">앱 알림</th>
              <td onClick={() => moveFuntion()}>&gt;</td>
            </tr>
            <tr>
              <th scope="row">문자 알림</th>
              <td onClick={() => moveFuntion()}>&gt;</td>
            </tr>
          </tbody>
        </table>

        <div>
          <em>
            <span
              style={{
                fontWeight: "bold",
                color: "red",
                borderTop: "1px solid red",
                margin: "30px 0px",
              }}
            >
              앱 환경
            </span>
          </em>
        </div>
        <ul className={Styles.mylist}>
          <li>
            앱 버전 <span style={{ float: "right" }}>2.99</span>
          </li>
          <li>
            단말기 모바일번호<span style={{ float: "right" }}>LM-V500N</span>
          </li>

          <li>
            단말기 OS버전<span style={{ float: "right" }}>12</span>
          </li>
        </ul>
      </div>

      <table className={Styles.table01}>
        <tbody>
          <tr>
            <th scope="row">
              클립보드 계좌번호 복사허용
              <Tooltip content="클립보드 복사허용" position="center">
                ❓
              </Tooltip>{" "}
            </th>
            <td>
              <Toggle
                id="option2"
                small
                disabled={false}
                checked={option2}
                onChange={setOption2}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">캐시/쿠키삭제</th>
            <td onClick={() => moveFuntion()}>&gt;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HomeSetup;
