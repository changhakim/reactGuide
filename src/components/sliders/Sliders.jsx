import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as ArrowLeft } from '@styles/assets/images/icon/icon-slider-arrow-left.svg';
import { ReactComponent as ArrowRight } from '@styles/assets/images/icon/icon-slider-arrow-right.svg';

//import './slick-theme.css';
//import './slick.css';

const Sliders  = ()=>{ 

    const settings = {
      arrow : true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />
    
      };  
 
  

  
    return (

        <>
        <div style={{ paddingLeft: '105px', paddingRight:'105px'}}>
          <h2> Sliders</h2>
          <Slider {...settings} style={{padding:'50px'}}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>
        </>
    )
}





function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowLeft
    className={className}
    style={{ ...style, display: "block",width:'50px', height:'40px'}}
    onClick={onClick}
    />
  );
}


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowRight
    style={{ ...style, display: "block",width:'50px', height:'40px'}}
    className={className}
    onClick={onClick}
    />
  );
}


export default Sliders;