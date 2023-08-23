import React, { useEffect, useState } from "react";
import Styles from "./Develop.module.scss";
import Modal from "./SampleEventModal";
import img1 from "@styles/assets/images/temp/baseball_1.png";
function SampleEventQuiz() {
  console.log("== SampleEventQuiz ==");

  let [modal, setModal] = useState(false);

  useEffect(() => {
    setModal(false);
  }, []);

  return (
    <div className={Styles.page}>
      <div>
        <button
          className={Styles.eventBtn}
          onClick={() => {
            setModal(true);
          }}
        >
          SOL 이벤트 퀴즈열기
        </button>
        <img src={img1} className={Styles.eventImg} />
        {modal === true ? <Modal /> : null}
      </div>
    </div>
  );
}

export default SampleEventQuiz;
