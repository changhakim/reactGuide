import PropTypes from "prop-types";

const BasicList = ({
  titleText = "",
  children = [],
  ulClass = "",
  liClass = "",
}) => {
  const list = children.map((data, index) => (
    <li key={data.key || `textList_${index}`} onClick={data.onClick} className={liClass}>
      {data.listContent}
    </li>
  ));
  return (
    <>
      {titleText}
      <ul className={ulClass}>{list}</ul>
    </>
  );
};

BasicList.propTypes = {
  titleText: PropTypes.object,
  children: PropTypes.array.isRequired,
  ulClass: PropTypes.string,
  liClass: PropTypes.string,
};

export default BasicList;
