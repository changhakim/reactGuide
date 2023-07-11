import CheckboxStyle from "./Checkbox.module.scss";
import CheckboxItem from "./CheckboxItem";

const Checkbox = () => {
  return (
    <ul className={CheckboxStyle["checkbox-ul"]}>
      <li className={CheckboxStyle["checkbox-list"]}>
        <div className={Checkbox["item-wrapper"]}>
          <label htmlFor="input1">
            <span>전체선택</span>
          </label>
          <input id="input1" type="checkbox" title="전체선택"></input>
        </div>
      </li>
      <CheckboxItem />
      {/* <li className={CheckboxStyle["checkbox-item"]}>
        <div className={CheckboxStyle["item-wrapper"]}>
          <label htmlFor="input2">
            <span>우리은행</span>
            <span></span>
            <span className={CheckboxStyle["desc"]}>1002-000-000000</span>
          </label>
          <input id="input2" type="checkbox"></input>
        </div>
      </li>
      <li className={CheckboxStyle["checkbox-item"]}>
        <div className={CheckboxStyle["item-wrapper"]}>
          <label htmlFor="input2">
            <span>우리은행</span>
            <span></span>
            <span className={CheckboxStyle["desc"]}>1002-000-000000</span>
          </label>
          <input id="input2" type="checkbox"></input>
        </div>
      </li> */}
    </ul>
  );
};

export default Checkbox;
