import { useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { bool, func, string, oneOfType, number, oneOf } from "prop-types";
import { _ } from "@utils";
import { WRAPPER_TYPE } from "./WRAPPER_TYPES";
import CheckboxStyle from "./Checkbox.module.scss";

const CheckboxItem = forwardRef(
  (
    { uiType, id, name, value, checked, description, disabled, onChange },
    ref
  ) => {
    const itemRef = useRef();
    const uIdRef = useRef({
      id: _.uniqueId("atomicInputId"),
      name: _.uniqueId("atomicInputName"),
    });

    const onChangeHandler = useCallback(
      (evt) => {
        if (evt) {
          evt.stopPropagation();
          onChange && onChange(evt);
        }
      },
      [onChange]
    );

    const LineBreak = useCallback((prop) => {
      let _str = prop.text;

      try {
        if (!_.isEmpty(prop.text)) {
          if (_.isString(prop.text)) {
            _str = prop.text.split("\n").map((txt, brIndex) => (
              <p
                key={`split-line-text-${brIndex + 1}`}
                className={`text-break`}
              >
                {txt}
              </p>
            ));
          }
        }
      } catch (ex) {
        console.log(ex);
      }

      return _str;
    }, []);

    useImperativeHandle(ref, () => itemRef.current && itemRef.current);

    return (
      <li className={CheckboxStyle[uiType]}>
        <div className={CheckboxStyle["item-wrapper"]}>
          <input
            className={CheckboxStyle["checkbox-input"]}
            ref={itemRef}
            id={id || uIdRef.current.id}
            name={name || uIdRef.current.name}
            type="checkbox"
            value={value || ""}
            checked={checked}
            disabled={disabled}
            onChange={onChangeHandler}
          ></input>
          <label htmlFor={id}>
            <LineBreak text={description} />
            {/* <span className={CheckboxStyle["desc"]}>{description}</span> */}
          </label>
        </div>
      </li>
    );
  }
);

CheckboxItem.propTypes = {
  uiType: oneOf(Object.values(WRAPPER_TYPE)),
  id: string,
  name: string,
  value: oneOfType([string, number]).isRequired,
  checked: bool,
  description: string,
  disabled: bool,
  onChange: func,
};

export default CheckboxItem;
