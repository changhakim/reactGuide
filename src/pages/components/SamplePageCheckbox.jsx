import { useState, useCallback, useEffect, useRef } from "react";
import { Checkbox, WRAPPER_TYPE } from "@components";
import { _ } from "@utils";

const itemArr = [
  {
    value: "우리",
    description: "우리\n0000-000-000000",
    disabled: false,
  },
  {
    value: "신한",
    description: "신한\n0000-000-111111",
    disabled: false,
  },
  {
    value: "국민",
    description: "국민\n0000-000-222222",
    disabled: false,
  },
];

const SamplePageCheckbox = () => {
  const [checked, setChecked] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const items = useRef(itemArr);

  useEffect(() => {
    checked.length === items.current.length
      ? setIsAllChecked(true)
      : setIsAllChecked(false);
  }, [checked]);

  const onChangeControl = useCallback((e) => {
    setChecked((prev) => {
      const removePrev = [];
      if (e.values) {
        e.values.forEach((v) => {
          removePrev.push(v);
        });
      }
      return removePrev;
    });
  }, []);

  const onChangeAllCont = (e) => {
    const itemArr2 = _.cloneDeep(items.current);
    const checkedarr = [];
    if (e.current.checked) {
      itemArr2.map((obj, idx) => {
        obj.checked = true;
        checkedarr.push(obj.value);
      });
    } else {
      itemArr2.map((obj, idx) => {
        obj.checked = false;
      });
    }
    setChecked(checkedarr);
    items.current = itemArr2;
  };

  return (
    <>
      <Checkbox
        uiType={WRAPPER_TYPE.CHECKBOXLISTLINE}
        items={[
          {
            value: "전체선택",
            checked: isAllChecked,
            description: "전체선택",
            disabled: false,
          },
        ]}
        onChange={(e) => {
          setIsAllChecked(e.current.checked);
          onChangeAllCont(e);
        }}
      />
      <Checkbox
        uiType={WRAPPER_TYPE.CHECKBOXLIST}
        items={items.current.map((obj, idx) => {
          return {
            value: obj.value,
            checked: checked.includes(obj.value),
            description: obj.description,
            disabled: obj.disabled,
          };
        })}
        onChange={(e) => {
          onChangeControl(e);
        }}
      />
    </>
  );
};

export default SamplePageCheckbox;
