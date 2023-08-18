import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as ArrowLeft } from "@styles/assets/images/icon/icon-slider-arrow-left.svg";
import { ReactComponent as ArrowRight } from "@styles/assets/images/icon/icon-slider-arrow-right.svg";
import { ImgList } from "@components";
import sampleMainStyle from "./SampleMain.module.scss";

const SampleMain = () => {
  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const bannerSettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  const testAccountInfo = [
    {
      alias: "급여통장",
      accountType: "입출금",
      accountNum: "123-123456-1234",
      amt: "1,000,000",
    },
    {
      alias: "입출금통장",
      accountType: "입출금",
      accountNum: "234-123456-1235",
      amt: "50,000",
    },
    {
      alias: "별명테스트",
      accountType: "입출금",
      accountNum: "234-123456-2345",
      amt: "100,000",
    },
    {
      alias: "통장이름",
      accountType: "입출금",
      accountNum: "234-111111-2222",
      amt: "33,333",
    },
  ];

  const testImgInfo = [
    {
      key: "sampleMainKey1",
      alt: "passbook",
      path: "img/passbook.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: (
        <>
          전체계좌
        </>
      ),
    },
    {
      key: "sampleMainKey2",
      alt: "building",
      path: "img/building.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: (
        <>
          오픈뱅킹
        </>
      ),
    },
    {
      key: "sampleMainKey3",
      alt: "gift",
      path: "img/gift.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: (
        <>
          이벤트
        </>
      ),
    },
    {
      key: "sampleMainKey4",
      alt: "pills",
      path: "img/pills.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: (
        <>
          대출케어
        </>
      ),
    },
    {
      key: "sampleMainKey5",
      alt: "medical-check",
      path: "img/medical-check.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: (
        <>
          아이웰스
        </>
      ),
    },
    {
      key: "sampleMainKey6",
      alt: "gear",
      path: "img/gear.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: (
        <>
          맞춤설정
        </>
      ),
    },
  ];

  const testBannerInfo = [
    {
        key: "imgKey1",
        alt: "imgList1",
        path: "img/입출금.jpg",
        onClick: () => {
          console.log("이미지1");
        },
      },
      {
        key: "imgKey2",
        alt: "imgList2",
        path: "img/예적금.jpg",
        onClick: () => {
          console.log("이미지2");
        },
      },
      {
        key: "imgKey3",
        alt: "imgList3",
        path: "img/외화예적금.jpg",
        onClick: () => {
          console.log("이미지3");
        },
      },
  ];

  return (
    <>
      <Slider {...sliderSettings} className={sampleMainStyle.account_box}>
        {testAccountInfo.map((info, index) => (
          <div key={`sampleMainAccount_${info.accountNum}`}>
            <p className={sampleMainStyle.inner_title}>{info.alias}</p>
            <p className={sampleMainStyle.inner_sub_title}>
              {info.accountType} {info.accountNum}
            </p>
            <p className={sampleMainStyle.txt_price}>
              <span>{info.amt}</span>원
              <button className={sampleMainStyle.account_hide_btn}>숨김</button>
            </p>
            <div className={sampleMainStyle.btn_wrap}>
            <span><button className={sampleMainStyle.account_inner_btn}>가져오기</button></span>
            <span><button className={sampleMainStyle.account_inner_btn}>보내기</button></span>
            </div>
          </div>
        ))}
      </Slider>
      <div className={sampleMainStyle.imgArea}>
        <ImgList children={testImgInfo} imgClass={sampleMainStyle.icoImg}/>
      </div>
      <Slider {...bannerSettings} className={sampleMainStyle.slide_wrap}>
        {testBannerInfo.map((info, index) => (
          <div key={info.key}>
            <img
              alt={info.alt}
              src={info.path}
              onClick={info.onClick}
              className={sampleMainStyle.bannerImg}
            />
          </div>
        ))}
      </Slider>
    </>
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

export default SampleMain;
