import { useRef, useCallback } from "react";
import {
  arrayOf,
  bool,
  func,
  shape,
  string,
  oneOfType,
  number,
  oneOf,
} from "prop-types";
import CheckboxStyle from "./Checkbox.module.scss";
import CheckboxItem from "./CheckboxItem";
import { _ } from "@utils";
import { WRAPPER_TYPE } from "./WRAPPER_TYPES";

const Checkbox = ({ uiType, id, name, items, onChange }) => {
  const checkboxRef = useRef([]);
  const uIdRef = useRef(_.uniqueId("checkboxItemUID"));

  const onChangeHandler = useCallback(
    (evt) => {
      const rtn = {
        values: [],
        selected: [],
        elements: [],
        current: {
          checked: false,
          value: "",
        },
      };

      try {
        if (evt && evt.target) {
          const checked = [];
          const _target = evt.target;

          if (checkboxRef && checkboxRef.current) {
            checkboxRef.current.forEach((v, i) => {
              // if (v.checked && !v.disabled) {
              if (v.checked) {
                checked.push(v);
              }
            });

            if (checked.length < 1) {
              throw evt;
            } else {
              const setValues = checked.map((item) => {
                return item.value;
              });

              // 체크된 아이템 필터링
              const _items = _.cloneDeep(items);
              const setItems = _items.filter((v) =>
                checked.some(({ value }) => v.value === value)
              );

              // 필터링된 아이템 checked true 변경
              if (_.isArray(setItems) && setItems.length > 0) {
                setItems.forEach((item) => {
                  item.checked = true;
                });
              }

              rtn.values = setValues;
              rtn.selected = setItems;
              rtn.elements = checked;
              rtn.current = {
                checked: _target.checked,
                value: _target.value,
              };
            }
          }
        }
      } catch (ex) {
        let v = "";

        if (ex && ex.target) {
          v = ex.target.value;
        }

        rtn.values = [];
        rtn.selected = [];
        rtn.elements = [];
        rtn.current = {
          checked: false,
          value: v,
        };
      } finally {
        onChange && onChange(rtn);
      }
    },
    [items, onChange]
  );

  const MakeWrap = useCallback((props) => {
    return <ul className={CheckboxStyle["checkbox-ul"]}>{props.children}</ul>;
  }, []);

  return (
    <>
      {/* <ul className={CheckboxStyle["checkbox-ul"]}>
        <li className={CheckboxStyle["checkbox-list"]}>
          <div className={Checkbox["item-wrapper"]}>
            <input id="input1" type="checkbox" title="전체선택"></input>
            <label htmlFor="input1">
              <span>전체선택</span>
            </label>
          </div>
        </li>
      </ul> */}
      <MakeWrap uiType={uiType}>
        {_.isArray(items) &&
          items.length > 0 &&
          items.map((item, idx) => {
            return (
              <CheckboxItem
                uiType={uiType}
                key={`${idx}`}
                id={`${id || uIdRef.current}${idx}`}
                name={name || `checkbox-item-name`}
                value={item.value}
                ref={(element) => (checkboxRef.current[idx] = element)}
                checked={item.checked}
                disabled={item.disabled}
                onChange={onChangeHandler}
                description={item.description}
              />
            );
          })}
      </MakeWrap>
      {/* <ul className={CheckboxStyle["checkbox-ul"]}>
        {items.map((item, idx) => {
          return (
            <CheckboxItem
              uiType={WRAPPER_TYPE.CHECKBOXLIST}
              key={`${idx}`}
              id={`${id || uIdRef.current}${idx}`}
              name={name || `checkbox-item-name`}
              value={item.value}
              ref={(element) => (checkboxRef.current[idx] = element)}
              checked={item.checked}
              disabled={item.disabled}
              onChange={onChangeHandler}
              description={item.description}
            />
          );
        })}
      </ul> */}
    </>
  );
};

Checkbox.propTypes = {
  uiType: oneOf(Object.values(WRAPPER_TYPE)),
  id: string,
  name: string,
  items: arrayOf(
    shape({
      value: oneOfType([string, number]),
      checked: bool,
      description: string,
      disabled: bool,
    })
  ).isRequired,
  onChange: func,
};

export default Checkbox;
