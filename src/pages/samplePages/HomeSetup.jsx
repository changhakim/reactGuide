import { useState, useEffect } from "react";
import Styles from "./Develop.module.scss";
import { Toggle } from "@components";
import { Tooltip } from "@components";
function HomeSetup() {
  console.log("== HomeSetup ==");
  let [option1, setOption1] = useState(false);

  const onNewsletterChange = (checked) => {
    if (!checked) {
      setOption1(false);
    } else {
      setOption1(true);
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.setList}>
        <h1>홈설정</h1>

        <ul>
          <li>
            홈화면 <span style={{ width: "149px" }}>기본&gt;</span>
          </li>
          <li>
            큰글씨<span>&gt;</span>
          </li>
          <li>
            계좌순서<span>&gt;</span>
          </li>
          <li>
            메뉴맞춤설정<span>&gt;</span>
          </li>
        </ul>
      </div>

      <div className={Styles.setList}>
        <h1>로그인설정</h1>
        <ul>
          <li>
            자동로그인{" "}
            <Tooltip
              content="간편인증으로 로그인한 경우에만 자동 로그인을 설정 할 수 있어요"
              position="center"
            >
              ❓
            </Tooltip>{" "}
            <span style={{ width: "149px" }}>기본&gt;</span>
          </li>
          <li>
            기존로그인방법
            <span style={{ width: "247px" }}>간편비밀번호인증&gt;</span>
          </li>
          <li>
            인증/보안<span>&gt;</span>
          </li>
        </ul>
      </div>

      <div className={Styles.setList}>
        <h1>알림 설정</h1>
        <ul>
          <li>
            앱 알림 <span>&gt;</span>
          </li>
          <li>
            문자 알림
            <span>&gt;</span>
          </li>
        </ul>
      </div>

      <div>
        <span style={{ fontWeight: "bold" }}>앱 환경</span>
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

      <div className={Styles.setList}>
        <ul>
          <li>
            클립보드 계좌번호 복사전용{" "}
            <Tooltip content="클립보드 계좌번호 복사전용" position="center">
              ❓
            </Tooltip>{" "}
            <span>&gt;</span>
          </li>
          <li>
            캐시/쿠키 삭제
            <span>&gt;</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomeSetup;
