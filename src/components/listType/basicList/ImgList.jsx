import PropTypes from "prop-types";

const ImgList = ({
  titleText = "",
  children = [],
  imgClass = "",
}) => {
  const list = children.map((data, index) => (
    <img key={data.key || `imgList_${index}`} className={imgClass} alt={data.alt} src={data.path} onClick={data.onClick}/>
  ));
  return (
    <>
      {titleText}
      {list}
    </>
  );
};

ImgList.propTypes = {
  titleText: PropTypes.object,
  children: PropTypes.array.isRequired,
  imgClass: PropTypes.string,
};

export default ImgList;
