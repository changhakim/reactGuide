import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as ArrowLeft } from "@styles/assets/images/icon/icon-slider-arrow-left.svg";
import { ReactComponent as ArrowRight } from "@styles/assets/images/icon/icon-slider-arrow-right.svg";
import { ImgList } from "@components";
import SampleMainStyle from "./SampleMain.module.scss";
import Styles from "./Develop.module.scss";
import SampleData from "./SampleData";
import classNames from "classnames/bind";

const SampleAllAccList = () => {
  let accInfo = [
    {
      alias: "급여통장",
      accountType: "입출금",
      accountNum: "123-123456-1234",
      ownerName: "테스트",
      amt: "1,000,000",
      bankCode: "010",
      bankName: "하나",
    },
    {
      alias: "입출금통장",
      accountType: "입출금",
      accountNum: "234-123456-1235",
      ownerName: "테스트",
      amt: "50,000",
      bankCode: "020",
      bankName: "우리",
    },
  ];

  const cx = classNames.bind(SampleMainStyle);
  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={Styles.page}>
      <span style={{ fontWeight: "bold", marginLeft: "40px" }}>입출금</span>
      <span style={{ fontWeight: "bold", position: "absolute", left: "380px" }}>
        15,000,000 원
      </span>
      <div {...sliderSettings} className={cx("account_box")}>
        {accInfo.map((info, index) => {
          return (
            <div key={`sampleMainAccount_${info.accountNum}`}>
              <p className={cx("inner_title")}>{info.alias}</p>
              <p className={cx("inner_sub_title")}>
                {info.accountType} {info.accountNum}
              </p>
              <p className={cx("txt_price")}>
                <span>{info.amt}</span>원
                <button className={cx("account_hide_btn")}>숨김</button>
              </p>
              <div className={cx("btn_wrap")}>
                <span>
                  <button className={cx("account_inner_btn")}>이체</button>
                </span>
                <span>
                  <button className={cx("account_inner_btn")}>거래내역</button>
                </span>
              </div>
              <p style={{ marginTop: "40px" }}></p>
            </div>
          );
        })}
      </div>
      <div>
        <ul className={Styles.mylist}>
          <li>
            예금신탁
            <span
              style={{ float: "right", position: "absolute", left: "72px" }}
            >
              37,000,000원
            </span>
          </li>
          <li>
            펀드
            <span
              style={{ float: "right", position: "absolute", left: "47px" }}
            >
              투자전문가추정&nbsp;&gt;
            </span>
          </li>
          <li>
            대출
            <span
              style={{ float: "right", position: "absolute", left: "72px" }}
            >
              37,000,000원
            </span>
          </li>
          <li>
            외화
            <span
              style={{ float: "right", position: "absolute", left: "103px" }}
            >
              1,621원
            </span>
          </li>
          <li>
            보험
            <span
              style={{ float: "right", position: "absolute", left: "128px" }}
            >
              &nbsp;&gt;
            </span>
          </li>
          <li>
            카드
            <span
              style={{ float: "right", position: "absolute", left: "64px" }}
            >
              내 하나카드&nbsp;&gt;
            </span>
          </li>
          <li>
            거래중지계좌
            <span
              style={{ float: "right", position: "absolute", left: "78px" }}
            >
              계좌조회&nbsp;&gt;
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowLeft
      className={className}
      style={{ ...style, display: "block", width: "50px", height: "40px" }}
      onClick={onClick}
    />
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowRight
      style={{ ...style, display: "block", width: "50px", height: "40px" }}
      className={className}
      onClick={onClick}
    />
  );
};

export default SampleAllAccList;
