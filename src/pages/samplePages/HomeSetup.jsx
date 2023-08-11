import { useState, useEffect } from "react";
import { Toggle } from "@components";

import Styles from "./Develop.module.scss";

function HomeSetup() {
  console.log("== HomeSetup ==");

  let [option1, setOption1] = useState(false);

  return (
    <div className={Styles.page}>
      <div className={Styles.tableContsPart}>
        <div className={Styles.contsTitlePack}>
          <h3 className={Styles.ebtitleNormal}>설정</h3>
        </div>
        <div className={Styles.tableViewPack}>
          <table className={Styles.ebtable}>
            <caption></caption>
            <colgroup>
              <col className={{ width: "240px" }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">홈 화면</th>
                <td>
                  <span>기본&gt;</span>
                </td>
              </tr>
              <tr>
                <th scope="row">큰 글씨</th>
                <td>
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
                <td>&gt;</td>
              </tr>
              <tr>
                <th scope="row">메뉴 맞춤설정</th>
                <td>&gt;</td>
              </tr>
            </tbody>
          </table>

          <table className={Styles.ebtable}>
            <caption></caption>
            <colgroup>
              <col className={{ width: "240px" }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">자동 로그인</th>
                <td>
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
                <th scope="row">기본 로그인방법</th>
                <td>간편비밀번호인증&gt;</td>
              </tr>
              <tr>
                <th scope="row">인증/보안</th>
                <td>&gt;</td>
              </tr>
            </tbody>
          </table>

          <table className={Styles.ebtable}>
            <caption></caption>
            <colgroup>
              <col className={{ width: "240px" }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">앱 알림</th>
                <td>&gt;</td>
              </tr>
              <tr>
                <th scope="row">문자 알림</th>
                <td>&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeSetup;
