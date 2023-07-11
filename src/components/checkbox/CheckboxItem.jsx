import CheckboxStyle from "./Checkbox.module.scss";

const CheckboxItem = () => {
  return (
    <li className={CheckboxStyle["checkbox-item"]}>
      <div className={CheckboxStyle["item-wrapper"]}>
        <label htmlFor="input2">
          <span>우리은행</span>
          <span></span>
          <span className={CheckboxStyle["desc"]}>1002-000-000000</span>
        </label>
        <input id="input2" type="checkbox"></input>
      </div>
    </li>
  );
};

export default CheckboxItem;
