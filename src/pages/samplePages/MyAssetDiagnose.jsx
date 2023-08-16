import { useState, useEffect } from "react";
import Styles from "./Develop.module.scss";
import { ChartDoughnut } from "@components";
import { ChartLine01 } from "@components";

function MyAssetDiagnose() {
  console.log("== MyAssetDiagnose ==");
  const [name, setName] = useState("");
  const [monData, setMonData] = useState(0);
  const [amt, setAmt] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setName("홍길동");
    setMonData(2);
    setAmt("1,900");
    setPercent("1.79");
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
        나의 총 투자자산 <span>{getToday()} 기준</span>
        <div className={Styles.inFloat}>
          투자 자산이 {monData}개월 전보다 <br></br>+{" "}
          <span style={{ color: "red", fontSize: "15px" }}>{amt}</span>원 +{" "}
          <span style={{ color: "red", fontSize: "15px" }}>{percent}</span>%
          증가 했어요.
          <br></br>
          <div style={{ float: "right", fontSize: "30px" }}>308,077원</div>
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
      <div style={{ textAlign: "center" }}>
        <input
          type="button"
          className={Styles.bottomButton}
          value={"내 자산현황 보기"}
        />
      </div>

      <div>
        <div className={Styles.contentWrap}>나의 자산 유형별 수익률 추이</div>
        <ChartLine01
          spacing={32}
          categories={[
            "2022-03-01",
            "2022-03-02",
            "2022-03-03",
            "2022-03-04",
            "2022-03-05",
          ]}
          seriesArray={[
            {
              name: "평가금액",
              color: "#72C4FF",
              tooltipSuffix: "원 입금",
              data: [1250000, 800000, 950000, 1400000, 1500000],
            },
          ]}
        />
      </div>
      <div>
        <div className={Styles.contentWrap}>나의 자산 유형별 현황</div>
        <ul className={Styles.mylist}>
          <li>
            국내주식
            <span>+ 1.76%</span>
            <br></br>
            <span className={Styles.mylistSub2}>20,272원</span>
          </li>
          <li>
            선진국주식
            <span style={{ marginLeft: "317px" }}>+ 1.97%</span>
            <br></br>
            <span className={Styles.mylistSub2}>186,612원</span>
          </li>
          <li>
            국내채권
            <span>+ 2.42%</span>
            <br></br>
            <span className={Styles.mylistSub2}>81,795원</span>
          </li>
          <li>
            해외채권
            <span>+ 3.11%</span>
            <br></br>
            <span className={Styles.mylistSub2}>20,395원</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyAssetDiagnose;
