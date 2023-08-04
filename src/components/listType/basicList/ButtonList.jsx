import PropTypes from "prop-types";

const ButtonList = ({
  titleText = "",
  children = [],
  buttonClass = "",
}) => {
  const list = children.map((data, index) => (
    <button key={data.key || `buttonList_${index}`} className={buttonClass} onClick={data.onClick}>
      {data.listContent}
    </button>
  ));
  return (
    <>
      {titleText}
      {list}
    </>
  );
};

ButtonList.propTypes = {
  titleText: PropTypes.object,
  children: PropTypes.array.isRequired,
  buttonClass: PropTypes.string,
};

export default ButtonList;
