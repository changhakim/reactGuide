import { useState, useEffect } from "react";
import Styles from "./Login.module.scss";

{
  /** 임시 DB 데이터 */
}
const User = {
  email: "t***@finger.co.kr",
  pw: "test111@@@",
};

function CommonLogin() {
  const [inputEmailMasking, setInputEmailMasking] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [emailValid, setEmailValid] = useState("");
  const [passwordValid, setPasswordValid] = useState("");

  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllow(false);
      return;
    }

    setNotAllow(true);
  }, [emailValid, passwordValid]);

  const handleEmailMasking = (e) => {
    setInputEmailMasking(e.target.value);

    let emailVal = e.target.value;
    let contentsVal = "";
    let len = "";

    var emailsArray = emailVal.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );

    if (emailsArray == null || emailsArray == "") {
      contentsVal = emailVal;
    } else {
      len = emailsArray.toString().split("@").length;
      contentsVal = emailVal
        .toString()
        .replace(new RegExp(".(?=.{0," + len + "}@)", "g"), "*");
    }
    setInputEmailMasking(contentsVal);

    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    setInputPassword(e.target.value);

    console.log("===>" + e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const onClickConfirmButton = () => {
    console.log("inputEmail 값 ::::: " + inputEmailMasking);

    if (inputEmailMasking === User.email && inputPassword === User.pw) {
      alert("로그인 성공");
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.titleWrap}>
        이메일과 비밀번호를
        <br />
        입력해주세요
      </div>

      <div className={Styles.contentWrap}>
        <div className={Styles.inputTitle}>이메일 주소</div>
        <div className={Styles.inputWrap}>
          <input
            className={Styles.input}
            placeholder="temp@finger.co.kr"
            value={inputEmailMasking}
            onChange={handleEmailMasking}
            maxLength={20}
          />
        </div>
        <div className={Styles.errorMessagWrap}>
          {!emailValid && inputEmailMasking.length > 0 && (
            <div>올바른 이메일을 입력하세요.</div>
          )}
        </div>
        <div style={{ marginTop: "26px" }} className={Styles.inputTitle}>
          비밀번호
        </div>
        <div className={Styles.inputWrap}>
          <input
            type="password"
            className={Styles.input}
            placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요."
            value={inputPassword}
            onChange={handlePassword}
            maxLength={15}
          />
        </div>
        <div className={Styles.errorMessagWrap}>
          {!passwordValid && inputPassword.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          className={Styles.bottomButton}
        >
          확인
        </button>
      </div>
    </div>
  );
}
export default CommonLogin;
