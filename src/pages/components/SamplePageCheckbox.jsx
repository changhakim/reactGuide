import { useState, useCallback, useEffect, useRef } from "react";
import { Checkbox, WRAPPER_TYPE } from "@components";
import { _ } from "@utils";
import Button from "react-bootstrap/Button";
import { useModal } from "@hooks";

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

const agreeArr = [
  {
    value: "약관1",
    description: "상기 약관에 동의합니다.",
    disabled: false,
    content: `제 1 조 (목적)
    이 약관은「공유마당」(이하 “사이트”라 칭함)에서 제공하는 인터넷관련서비스(이하 "서비스"라 칭함)를 이용함에 있어 「공유마당」과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
    제 2 조 (용어의 정의)
    이 약관에서 사용하는 주요한 용어의 정의는 다음과 같습니다.
    ① ‘회원’이라 함은 이 약관에 동의하고, 「공유마당」과 서비스 이용 계약을 체결하여 이용자 아이디(ID)를 부여 받은 개인 및 기관을 말합니다.
    ② ‘회원 아이디’(이하 ‘ID’라 칭함)라 함은 회원의 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 신청함에 따라 「공유마당」에서 승인한 문자나 숫자 혹은 그 조합을 말합니다. 기관의 정보로 가입한 ID는 관련 법규가 인정하는 범위에서 개인정보와 같은 권리와 의무를 가지며 이하 개인과 개인정보로 언급되는 모든 약관은 기관과 기관정보를 포함합니다.`,
  },
  {
    value: "약관2",
    description: "상기 약관에 동의합니다.",
    disabled: false,
    content: `제 4 조 (약관 외 준칙)
    본 약관에 명시되지 아니한 사항에 대해서는 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 기타 관련 법령의 규정에 따릅니다. 제 2장 서비스 이용 계약제 5 조 (서비스 이용 신청)회원으로 가입하여 서비스를 이용하기를 희망하는 자는 서비스에서 정한 가입 양식에 따라 회원정보를 기입하고, 요청하는 제반 정보(개인인적사항이나 기관정보 등)를 제공하여 이용신청을 합니다.`,
  },
];

const SamplePageCheckbox = () => {
  const [checked, setChecked] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const items = useRef(itemArr);
  const [isAgree, setIsAgree] = useState([]);
  const [isAgreeAll, setIsAgreeAll] = useState(false);
  const agreeItems = useRef(agreeArr);
  const [errMsgOn, setErrMsgOn] = useState(false);
  const { handleModalPopup } = useModal();

  useEffect(() => {
    checked.length === items.current.length
      ? setIsAllChecked(true)
      : setIsAllChecked(false);

    if (isAgree.length === agreeItems.current.length) {
      setIsAgreeAll(true);
      setErrMsgOn(false);
    } else {
      setIsAgreeAll(false);
      setErrMsgOn(true);
    }
  }, [checked, isAgree]);

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

  const onChangeAgree = (e) => {
    setIsAgree((prev) => {
      const removePrev = [];

      if (prev.length < 1) {
        removePrev.push(e.current.value);
      } else {
        prev.forEach((v) => {
          if (v !== e.current.value) {
            removePrev.push(v);
          }
        });
        if (e.current.checked) {
          removePrev.push(e.current.value);
        }
      }

      return removePrev;
    });
  };

  const onChangeAgreeAll = (e) => {
    const agreeItems2 = _.cloneDeep(agreeItems.current);
    const checkedarr = [];
    if (e.current.checked) {
      agreeItems2.map((obj, idx) => {
        obj.checked = true;
        checkedarr.push(obj.value);
        return true;
      });
    } else {
      agreeItems2.map((obj, idx) => {
        obj.checked = false;
        return true;
      });
    }
    setIsAgree(checkedarr);
    setErrMsgOn(false);
    agreeItems.current = agreeItems2;
  };

  const onBtnClick = () => {
    handleModalPopup({
      isOpen: true,
      uiType: `alert`,
      content: `약관 동의 완료`,
      title: `확인`,
    });
  };

  return (
    <>
      <h4>{`<일반 Checkbox Sample>`}</h4>
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
      <hr></hr>
      <h4>{`<약관 Sample>`}</h4>
      <div style={{ padding: "5px" }}>
        {agreeItems.current.map((item, idx) => {
          return (
            <div
              key={`div-${idx}`}
              style={{
                margin: "5px 30px",
              }}
            >
              <textarea
                key={`content-${idx}`}
                style={{
                  height: "100px",
                  width: "100%",
                  resize: "none",
                }}
                readOnly={true}
                value={item.content}
              ></textarea>
              <Checkbox
                key={`CheckboxAgree-${idx}`}
                uiType={WRAPPER_TYPE.CHECKBOXLISTLINE}
                items={[
                  {
                    value: item.value,
                    checked: isAgree.includes(item.value),
                    description: item.description,
                    disabled: item.disabled,
                  },
                ]}
                onChange={(e) => {
                  console.log(e);
                  onChangeAgree(e);
                }}
              />
            </div>
          );
        })}
        <hr style={{ width: "90%", alignItems: "center", margin: "auto" }}></hr>
        <Checkbox
          uiType={WRAPPER_TYPE.CHECKBOXLISTLINE}
          items={[
            {
              value: "모두 동의",
              checked: isAgreeAll,
              description: "모두 동의",
              disabled: false,
            },
          ]}
          onChange={(e) => {
            setIsAgreeAll(e.current.checked);
            onChangeAgreeAll(e);
          }}
        />
        {/* <input type="button" value={"확인"}></input> */}
        <div style={{ textAlign: "right" }}>
          <Button
            variant="outline-dark"
            disabled={errMsgOn}
            onClick={onBtnClick}
          >
            확인
          </Button>
        </div>
      </div>
    </>
  );
};

export default SamplePageCheckbox;
