import { useRef, useState, useEffect, useCallback } from "react";
import Styles from "./AccMngList.module.scss";
import { Checkbox, WRAPPER_TYPE } from "@components";
import { _ } from "@utils";
import { Accordion } from "@components";

const bottomButton = {
  width: "50%",
  height: "48px",
  border: "none",
  fontWeight: "700",
  backgroundColor: "#6c757d",
  color: "white",
  marginBottom: "40px",
  marginTop: "40px",
  marginLeft: "150px",
  cursor: "pointer",
};

const InfoList2 = {
  data: [
    {
      keyCode: "1",
      accNo: "110-251-369493",
      bankInfo: ["신한", "TOP 직장인플랜 저축예금"],
    },
    {
      keyCode: "2",
      accNo: "110-525-092986",
      bankInfo: ["신한", "SOL편한 입출금통장"],
    },
    {
      keyCode: "3",
      accNo: "180-006-795477",
      bankInfo: ["신한", "외화 체인지업 예금(EUR)"],
    },
  ],
};

const accordionData = [
  {
    title: "알아 두세요.",
    content: `출금계좌 등록을 하시면, 등록하신 계좌에서 출금을 하실 수 있습니다.`,
  },
];

const InfoList = [
  {
    value: "110-251-369493",
    description: "신한\n110-251-369493",
    disabled: false,
  },
  {
    value: "110-525-092986",
    description: "신한\n110-525-092986",
    disabled: false,
  },
  {
    value: "180-006-795477",
    description: "신한\n180-006-795477",
    disabled: false,
  },
];

function CommonAccMngList() {
  console.log("== CommonAccMngList ==");

  const [checked, setChecked] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const items = useRef(InfoList);

  useEffect(() => {
    if (checked.length === items.current.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
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
        return true;
      });
    } else {
      itemArr2.map((obj, idx) => {
        obj.checked = false;
        return true;
      });
    }
    setChecked(checkedarr);
    items.current = itemArr2;
  };

  return (
    <div>
      <div>
        <span>
          <h2>출금 계좌</h2>
        </span>
      </div>
      <div>
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
      </div>
      <Accordion sections={accordionData} />
      <div>
        <button style={bottomButton}>확인</button>
      </div>
    </div>
  );
}

export default CommonAccMngList;
