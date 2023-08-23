import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as ArrowLeft } from "@styles/assets/images/icon/icon-slider-arrow-left.svg";
import { ReactComponent as ArrowRight } from "@styles/assets/images/icon/icon-slider-arrow-right.svg";
import { ImgList } from "@components";
import SampleMainStyle from "./SampleMain.module.scss";
import SampleData from "./SampleData";
import classNames from 'classnames/bind';

const SampleMain = () => {
  const cx = classNames.bind(SampleMainStyle);
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

  return (
    <>
      <Slider {...sliderSettings} className={cx('account_box')}>
        {SampleData.testAccountInfo.map((info, index) => (
          <div key={`sampleMainAccount_${info.accountNum}`}>
            <p className={cx('inner_title')}>{info.alias}</p>
            <p className={cx('inner_sub_title')}>
              {info.accountType} {info.accountNum}
            </p>
            <p className={cx('txt_price')}>
              <span>{info.amt}</span>원
              <button className={cx('account_hide_btn')}>숨김</button>
            </p>
            <div className={cx('btn_wrap')}>
            <span><button className={cx('account_inner_btn')}>가져오기</button></span>
            <span><button className={cx('account_inner_btn')}>보내기</button></span>
            </div>
          </div>
        ))}
      </Slider>
      <div className={cx('imgArea')}>
        <ImgList children={SampleData.testImgInfo} imgClass={cx('icoImg')}/>
      </div>
      <Slider {...bannerSettings} className={cx('slide_wrap')}>
        {SampleData.testBannerInfo.map((info, index) => (
          <div key={info.key}>
            <img
              alt={info.alt}
              src={info.path}
              onClick={info.onClick}
              className={cx('bannerImg')}
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
