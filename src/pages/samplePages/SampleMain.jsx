import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// eslint-disable-next-line no-unused-vars
import sampleMainStyle from "./SampleMain.module.scss"; //TODO

const SampleMain  = ()=>{ 

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,  
    };  

    return (
        <Slider {...sliderSettings}>
            <div>
                <p>급여통장</p>
                <p>입출금 123-123456-1234</p>
                <p><span>1,000,000원</span> <button onClick={()=>{console.log('미구현')}}>숨김</button></p>
                <button>가져오기</button>
                <button>보내기</button>
            </div>
            <div>
                <p>입출금통장</p>
                <p>입출금 234-123456-1235</p>
                <p><span>50,000원</span> <button onClick={()=>{console.log('미구현')}}>숨김</button></p>
                <button>가져오기</button>
                <button>보내기</button>
            </div>
            <div>
                <p>별명테스트</p>
                <p>입출금 234-123456-2345</p>
                <p><span>100,000원</span> <button onClick={()=>{console.log('미구현')}}>숨김</button></p>
                <button>가져오기</button>
                <button>보내기</button>
            </div>
            <div>
                <p>통장이름</p>
                <p>입출금 234-111111-2222</p>
                <p><span>33,333원</span> <button onClick={()=>{console.log('미구현')}}>숨김</button></p>
                <button>가져오기</button>
                <button>보내기</button>
            </div>
        </Slider>
    )
}

export default SampleMain;