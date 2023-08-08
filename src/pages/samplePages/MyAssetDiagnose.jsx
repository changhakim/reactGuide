import { useState, useEffect } from "react";
import Styles from "./Develop.module.scss";
import { ChartDoughnut } from "@components";

function MyAssetDiagnose() {
  console.log("== MyAssetDiagnose ==");
  const [name, setName] = useState("");

  useEffect(() => {
    setName("홍길동");
  }, [name]);

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return year + "." + month + "." + day;
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.titleWrap}>
        <span>{name}님의</span>
        <br />
        <span>자산상태는 지금 어떤가요?</span>
      </div>

      <div className={Styles.contentWrap}>
        나의 총 투자자산 <span>오늘 날짜 : {getToday()}</span>
        <div className={Styles.inFloat}>
          투자 자산이 1개월 전보다 + 1377원 증가 했어요.
        </div>
      </div>
      <div>
        <ChartDoughnut
          name="테스트차트 테스트챠트"
          spacing={16}
          className="box"
          data={[
            {
              y: 60.2,
              name: "국내채권",
              color: "#FFD700",
            },
            {
              y: 26.7,
              name: "해외채권",
              color: "#FF8C00",
            },
            {
              y: 6.6,
              name: "선진국주식",
              color: "#7B68EE",
            },
            {
              y: 6.5,
              name: "국내주식",
              color: "#87CEFA",
            },
          ]}
        />
      </div>
      <div>
        <input type="button" value={"내 자산현황 보기"} />
      </div>
    </div>
  );
}

export default MyAssetDiagnose;
